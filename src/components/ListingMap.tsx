import type { Listing } from "../data/listings";

interface ListingMapProps {
  listings: Listing[];
  className?: string;
  singleListing?: boolean;
}

function buildEmbedUrl(listings: Listing[], singleListing: boolean) {
  if (singleListing) {
    const { lat, lng } = listings[0];
    const offset = 0.005;
    const bbox = `${lng - offset},${lat - offset},${lng + offset},${lat + offset}`;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  }

  // Show Johnston area with enough room for all markers
  const lats = listings.map((l) => l.lat);
  const lngs = listings.map((l) => l.lng);
  const padding = 0.02;
  const bbox = [
    Math.min(...lngs) - padding,
    Math.min(...lats) - padding,
    Math.max(...lngs) + padding,
    Math.max(...lats) + padding,
  ].join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`;
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
}: ListingMapProps) {
  if (listings.length === 0) return null;

  const embedUrl = buildEmbedUrl(listings, singleListing);
  const largeMapUrl = buildLargeMapUrl(listings, singleListing);
  const height = singleListing ? "250" : "450";

  return (
    <div className={className}>
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <iframe
          title={
            singleListing
              ? `Map showing ${listings[0].name}`
              : "Map of community resources in Johnston, RI"
          }
          src={embedUrl}
          width="100%"
          height={height}
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
      <p className="mt-1 text-xs" style={{ color: "#374151" }}>
        <a
          href={largeMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          style={{ color: "#1d4ed8" }}
        >
          View larger map
        </a>
        {" — "}
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
