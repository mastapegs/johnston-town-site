import { categories, listings } from "../data/listings";

function StatsSection() {
  return (
    <section aria-label="Directory statistics">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="rounded-lg border border-gray-200 bg-white px-4 py-6">
          <p className="text-3xl font-bold text-blue-700">{listings.length}</p>
          <p className="mt-1 text-sm text-gray-700">Verified Listings</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white px-4 py-6">
          <p className="text-3xl font-bold text-blue-700">
            {categories.length}
          </p>
          <p className="mt-1 text-sm text-gray-700">Categories</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white px-4 py-6">
          <p className="text-3xl font-bold text-blue-700">100%</p>
          <p className="mt-1 text-sm text-gray-700">Free to Use</p>
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
