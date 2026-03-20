import { Link, useParams } from "react-router";
import { listings } from "../data/listings";

function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const listing = listings.find((l) => l.id === id);

  if (!listing) {
    return (
      <div className="py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Listing Not Found</h1>
        <p className="mt-2 text-gray-600">
          This listing doesn&apos;t exist or may have been removed.
        </p>
        <Link
          to="/directory"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          &larr; Back to Directory
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/directory" className="text-sm text-blue-600 hover:underline">
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
            <dt className="font-medium text-gray-500">Address</dt>
            <dd className="text-gray-900">{listing.address}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Phone</dt>
            <dd className="text-gray-900">{listing.phone}</dd>
          </div>
          {listing.hours && (
            <div>
              <dt className="font-medium text-gray-500">Hours</dt>
              <dd className="text-gray-900">{listing.hours}</dd>
            </div>
          )}
          {listing.website && (
            <div>
              <dt className="font-medium text-gray-500">Website</dt>
              <dd>
                <a
                  href={listing.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {listing.website}
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}

export default ListingDetail;
