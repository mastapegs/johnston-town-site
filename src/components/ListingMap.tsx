import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Listing } from "../data/listings";

// Fix Leaflet's default icon paths broken by bundlers
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

// Johnston, RI center — used as default view
const JOHNSTON_CENTER: L.LatLngTuple = [41.824, -71.49];

interface ListingMapProps {
  listings: Listing[];
  className?: string;
  singleListing?: boolean;
}

async function geocodeAddress(address: string): Promise<L.LatLngTuple | null> {
  const url = new URL(NOMINATIM_URL);
  url.searchParams.set("q", address);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "us");

  const res = await fetch(url.toString(), {
    headers: {
      "User-Agent": "johnston-town-site (community directory)",
    },
  });

  if (!res.ok) return null;

  const data = (await res.json()) as { lat: string; lon: string }[];
  if (data.length === 0) return null;

  return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
}

function ListingMap({
  listings,
  className = "",
  singleListing = false,
}: ListingMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || listings.length === 0) return;

    // Create map
    const map = L.map(containerRef.current).setView(JOHNSTON_CENTER, 13);
    mapRef.current = map;

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Place markers by geocoding each listing's address
    const markers: L.Marker[] = [];

    async function placeMarkers() {
      for (let i = 0; i < listings.length; i++) {
        const listing = listings[i];

        // Respect Nominatim's 1 req/sec policy for multiple listings
        if (i > 0) {
          await new Promise((r) => setTimeout(r, 1100));
        }

        const coords = await geocodeAddress(listing.address);
        if (!coords) {
          // Fall back to stored coordinates
          if (listing.lat && listing.lng) {
            const fallback: L.LatLngTuple = [listing.lat, listing.lng];
            const marker = L.marker(fallback).addTo(map);
            marker.bindPopup(
              `<strong>${listing.name}</strong><br/>${listing.address}`,
            );
            markers.push(marker);
          }
          continue;
        }

        const marker = L.marker(coords).addTo(map);
        marker.bindPopup(
          `<strong>${listing.name}</strong><br/>${listing.address}`,
        );
        markers.push(marker);
      }

      // Adjust map view to show all markers
      if (markers.length === 1 && singleListing) {
        map.setView(markers[0].getLatLng(), 16);
      } else if (markers.length > 0) {
        const group = L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.15));
      }
    }

    placeMarkers();

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [listings, singleListing]);

  if (listings.length === 0) return null;

  const height = singleListing ? "250px" : "450px";

  return (
    <div className={className}>
      <div
        ref={containerRef}
        role="application"
        aria-label={
          singleListing
            ? `Map showing ${listings[0].name}`
            : "Map of community resources in Johnston, RI"
        }
        className="overflow-hidden rounded-lg border border-gray-200"
        style={{ height }}
      />
      <p className="mt-1 text-xs" style={{ color: "#374151" }}>
        Map data &copy;{" "}
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          style={{ color: "#1d4ed8" }}
        >
          OpenStreetMap
        </a>
      </p>
    </div>
  );
}

export default ListingMap;
