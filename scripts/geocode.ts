/**
 * Geocode script — resolves listing addresses to lat/lng coordinates
 * using the OpenStreetMap Nominatim API (free, no API key required).
 *
 * Usage: npx tsx scripts/geocode.ts
 *
 * Reads listings from src/data/listings.json and updates them in-place
 * with lat/lng coordinates. Only geocodes listings that are missing
 * coordinates or whose address has changed. Nominatim requires a
 * 1-second delay between requests per their usage policy.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const LISTINGS_PATH = path.join(ROOT, "src/data/listings.json");
const CACHE_PATH = path.join(__dirname, ".geocode-cache.json");

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const USER_AGENT = "johnston-town-site geocoder (community directory)";
const DELAY_MS = 1100; // >1 second between requests per Nominatim policy

interface Coordinates {
  lat: number;
  lng: number;
}

interface ListingEntry {
  id: string;
  address: string;
  lat?: number;
  lng?: number;
  [key: string]: unknown;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function geocode(address: string): Promise<Coordinates | null> {
  const url = new URL(NOMINATIM_URL);
  url.searchParams.set("q", address);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "us");

  const res = await fetch(url.toString(), {
    headers: { "User-Agent": USER_AGENT },
  });

  if (!res.ok) {
    console.error(`  HTTP ${res.status} for "${address}"`);
    return null;
  }

  const data = (await res.json()) as { lat: string; lon: string }[];

  if (data.length === 0) {
    console.error(`  No results for "${address}"`);
    return null;
  }

  return {
    lat: parseFloat(parseFloat(data[0].lat).toFixed(4)),
    lng: parseFloat(parseFloat(data[0].lon).toFixed(4)),
  };
}

async function main() {
  const listings: ListingEntry[] = JSON.parse(
    fs.readFileSync(LISTINGS_PATH, "utf-8"),
  );
  console.log(`Found ${listings.length} listings.\n`);

  // Load cache of previously geocoded addresses
  let cache: Record<string, string> = {};
  if (fs.existsSync(CACHE_PATH)) {
    cache = JSON.parse(fs.readFileSync(CACHE_PATH, "utf-8"));
  }

  let geocoded = 0;

  for (const listing of listings) {
    const hasCoords = listing.lat != null && listing.lng != null;
    const addressUnchanged = cache[listing.id] === listing.address;

    // Skip if coordinates exist and address hasn't changed
    if (hasCoords && addressUnchanged) {
      console.log(`✓ ${listing.id} (cached)`);
      continue;
    }

    console.log(`→ Geocoding: ${listing.id} — "${listing.address}"`);

    if (geocoded > 0) {
      await sleep(DELAY_MS);
    }

    const coords = await geocode(listing.address);
    geocoded++;

    if (coords) {
      listing.lat = coords.lat;
      listing.lng = coords.lng;
      cache[listing.id] = listing.address;
      console.log(`  ${coords.lat}, ${coords.lng}`);
    } else {
      console.error(`  ✗ Failed to geocode ${listing.id}`);
    }
  }

  fs.writeFileSync(LISTINGS_PATH, JSON.stringify(listings, null, 2) + "\n");
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2) + "\n");
  console.log(
    `\nUpdated ${path.relative(ROOT, LISTINGS_PATH)} (${geocoded} geocoded)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
