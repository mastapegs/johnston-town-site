import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { listings } from "../data/listings";
import { CONTACT_EMAIL, SITE_NAME } from "../config";
import ListingMap from "../components/ListingMap";
import { useUserLocation } from "../useUserLocation";

function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const listing = listings.find((l) => l.id === id);
  const userLocation = useUserLocation();

  useEffect(() => {
    document.title = listing
      ? `${listing.name} — ${SITE_NAME}`
      : `Listing Not Found — ${SITE_NAME}`;
  }, [listing]);

  if (!listing) {
    return (
      <div className="py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Listing Not Found</h1>
        <p className="mt-2 text-gray-600">
          This listing doesn&apos;t exist or may have been removed.
        </p>
        <Link
          to="/directory"
          className="mt-4 inline-block text-blue-600 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
        >
          &larr; Back to Directory
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/directory"
        className="text-sm text-blue-600 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
      >
        &larr; Back to Directory
      </Link>

      <div className="mt-4 rounded-lg border border-gray-200 bg-white p-6">
        <span className="text-xs font-medium text-blue-600">
          {listing.category}
        </span>
        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          {listing.name}
        </h1>
        <p className="mt-3 text-gray-700">{listing.description}</p>

        <dl className="mt-6 space-y-3 text-sm">
          <div>
            <dt className="font-medium text-gray-700">Address</dt>
            <dd className="text-gray-900">{listing.address}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-700">Phone</dt>
            <dd className="text-gray-900">
              <a
                href={`tel:${listing.phoneHref}`}
                aria-label={`Call ${listing.name}`}
                className="text-blue-700 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
              >
                {listing.phone}
              </a>
            </dd>
          </div>
          {listing.hours && (
            <div>
              <dt className="font-medium text-gray-700">Hours</dt>
              <dd className="text-gray-900">{listing.hours}</dd>
            </div>
          )}
          {listing.website && (
            <div>
              <dt className="font-medium text-gray-700">Website</dt>
              <dd>
                <a
                  href={listing.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${listing.name} website (opens in new tab)`}
                  className="text-blue-700 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
                >
                  {listing.website}
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>

      <div className="mt-6">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Location</h2>
        <ListingMap
          listings={[listing]}
          singleListing
          userLocation={userLocation}
        />
      </div>

      <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700">
        <p>
          See something wrong with this listing?{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Issue with listing: ${listing.name}`)}&body=${encodeURIComponent(`Listing: ${listing.name}\nPage: ${window.location.origin}/directory/${listing.id}\n\nWhat's incorrect or outdated?\n\n`)}`}
            aria-label={`Report an issue with ${listing.name} via email`}
            className="text-blue-700 underline hover:text-blue-900 focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
          >
            Report an issue
          </a>
        </p>
      </div>
    </div>
  );
}

export default ListingDetail;
