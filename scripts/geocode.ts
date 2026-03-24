/**
 * Geocode script — resolves listing addresses to lat/lng coordinates
 * using the OpenStreetMap Nominatim API (free, no API key required).
 *
 * Usage: npx tsx scripts/geocode.ts
 *
 * Reads listings from src/data/listings.ts and writes coordinates to
 * src/data/coordinates.generated.json. Nominatim requires a 1-second
 * delay between requests per their usage policy.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const LISTINGS_PATH = path.join(ROOT, "src/data/listings.json");
const OUTPUT_PATH = path.join(ROOT, "src/data/coordinates.generated.json");

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const USER_AGENT = "johnston-town-site geocoder (community directory)";
const DELAY_MS = 1100; // >1 second between requests per Nominatim policy

interface Coordinates {
  lat: number;
  lng: number;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Extract listing ids and addresses from the JSON data file. */
function parseListings(): { id: string; address: string }[] {
  const source = fs.readFileSync(LISTINGS_PATH, "utf-8");
  const data = JSON.parse(source) as { id: string; address: string }[];
  return data.map(({ id, address }) => ({ id, address }));
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
  const listings = parseListings();
  console.log(`Found ${listings.length} listings to geocode.\n`);

  // Load existing coordinates to avoid re-geocoding unchanged addresses
  let existing: Record<string, Coordinates & { address: string }> = {};
  if (fs.existsSync(OUTPUT_PATH)) {
    existing = JSON.parse(fs.readFileSync(OUTPUT_PATH, "utf-8"));
  }

  const results: Record<string, Coordinates & { address: string }> = {};
  let geocoded = 0;

  for (const listing of listings) {
    // Skip geocoding if address hasn't changed
    const cached = existing[listing.id];
    if (cached && cached.address === listing.address) {
      console.log(`✓ ${listing.id} (cached)`);
      results[listing.id] = cached;
      continue;
    }

    console.log(`→ Geocoding: ${listing.id} — "${listing.address}"`);

    if (geocoded > 0) {
      await sleep(DELAY_MS);
    }

    const coords = await geocode(listing.address);
    geocoded++;

    if (coords) {
      results[listing.id] = { ...coords, address: listing.address };
      console.log(`  ${coords.lat}, ${coords.lng}`);
    } else {
      console.error(`  ✗ Failed to geocode ${listing.id}`);
      // Keep old coordinates if available
      if (cached) {
        results[listing.id] = cached;
        console.log(`  Using previous coordinates`);
      }
    }
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2) + "\n");
  console.log(`\nWrote coordinates to ${path.relative(ROOT, OUTPUT_PATH)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
