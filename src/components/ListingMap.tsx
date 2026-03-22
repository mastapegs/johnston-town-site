import { useMemo } from "react";
import type { Listing } from "../data/listings";

interface ListingMapProps {
  listings: Listing[];
  className?: string;
  singleListing?: boolean;
  userLocation?: { lat: number; lng: number } | null;
}

function buildSingleEmbedUrl(listing: Listing) {
  const { lat, lng } = listing;
  const offset = 0.005;
  const bbox = `${lng - offset},${lat - offset},${lng + offset},${lat + offset}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
}

function buildMultiMarkerSrcdoc(
  listings: Listing[],
  userLocation?: { lat: number; lng: number } | null,
) {
  const markers = listings.map(
    (l) =>
      `L.marker([${l.lat},${l.lng}]).addTo(map).bindPopup(${JSON.stringify(`<strong>${l.name}</strong><br>${l.address}`)});`,
  );

  const lats = listings.map((l) => l.lat);
  const lngs = listings.map((l) => l.lng);

  if (userLocation) {
    lats.push(userLocation.lat);
    lngs.push(userLocation.lng);
  }

  const padding = 0.01;
  const bounds = `[[${Math.min(...lats) - padding},${Math.min(...lngs) - padding}],[${Math.max(...lats) + padding},${Math.max(...lngs) + padding}]]`;

  const userMarkerScript = userLocation
    ? `L.circleMarker([${userLocation.lat},${userLocation.lng}],{radius:8,fillColor:'#4285F4',color:'#fff',weight:2,opacity:1,fillOpacity:0.9}).addTo(map).bindPopup('<strong>Your location</strong>');`
    : "";

  return (
    `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><` +
    `/script>
<style>html,body,#map{margin:0;padding:0;width:100%;height:100%}</style>
</head>
<body>
<div id="map"></div>
<script>
var map=L.map('map',{scrollWheelZoom:false});
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  maxZoom:19
}).addTo(map);
${markers.join("\n")}
${userMarkerScript}
map.fitBounds(${bounds});
<` +
    `/script>
</body>
</html>`
  );
}

function buildLargeMapUrl(listings: Listing[], singleListing: boolean) {
  if (singleListing) {
    const { lat, lng } = listings[0];
    return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`;
  }
  return `https://www.openstreetmap.org/#map=12/41.824/-71.49`;
}

function ListingMap({
  listings,
  className = "",
  singleListing = false,
  userLocation,
}: ListingMapProps) {
  const useSrcdoc = listings.length > 0 && (!singleListing || !!userLocation);

  const srcdoc = useMemo(
    () =>
      useSrcdoc ? buildMultiMarkerSrcdoc(listings, userLocation) : undefined,
    [listings, useSrcdoc, userLocation],
  );

  if (listings.length === 0) return null;

  const largeMapUrl = buildLargeMapUrl(listings, singleListing);
  const height = singleListing ? "250" : "450";

  return (
    <div className={className}>
      <div className="overflow-hidden rounded-lg border border-gray-200">
        {singleListing && !srcdoc ? (
          <iframe
            title={`Map showing ${listings[0].name}`}
            src={buildSingleEmbedUrl(listings[0])}
            width="100%"
            height={height}
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <iframe
            title={
              singleListing
                ? `Map showing ${listings[0].name}`
                : "Map of community resources in Johnston, RI"
            }
            srcDoc={srcdoc}
            width="100%"
            height={height}
            style={{ border: 0 }}
          />
        )}
      </div>
      <p className="mt-1 text-xs text-gray-700">
        <a
          href={largeMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline"
        >
          View larger map
        </a>
        {" — "}
        Map data &copy;{" "}
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline"
        >
          OpenStreetMap
        </a>
      </p>
    </div>
  );
}

export default ListingMap;
