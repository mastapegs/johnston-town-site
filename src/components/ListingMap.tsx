import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { Link } from "react-router";
import type { Listing } from "../data/listings";
import "leaflet/dist/leaflet.css";

const markerIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface ListingMapProps {
  listings: Listing[];
  className?: string;
  singleListing?: boolean;
}

function ListingMap({
  listings,
  className = "",
  singleListing = false,
}: ListingMapProps) {
  if (listings.length === 0) return null;

  const center: [number, number] = singleListing
    ? [listings[0].lat, listings[0].lng]
    : [41.824, -71.516];

  const zoom = singleListing ? 15 : 12;

  return (
    <div
      className={`overflow-hidden rounded-lg border border-gray-200 ${className}`}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
        className="h-full w-full"
        style={{ minHeight: singleListing ? "250px" : "400px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution=""
        />
        {listings.map((listing) => (
          <Marker
            key={listing.id}
            position={[listing.lat, listing.lng]}
            icon={markerIcon}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{listing.name}</p>
                <p style={{ color: "#4b5563" }}>{listing.address}</p>
                {!singleListing && (
                  <Link
                    to={`/directory/${listing.id}`}
                    className="mt-1 inline-block underline"
                    style={{ color: "#1d4ed8" }}
                  >
                    View details
                  </Link>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <p
        className="px-2 py-1 text-xs"
        style={{ backgroundColor: "#fff", color: "#111827" }}
      >
        &copy;{" "}
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          style={{ backgroundColor: "#fff", color: "#1d4ed8" }}
        >
          OpenStreetMap
        </a>{" "}
        contributors
      </p>
    </div>
  );
}

export default ListingMap;
