import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { categories, listingsResult } from "../data/listings";
import { SITE_NAME } from "../config";
import ListingMap from "../components/ListingMap";
import DataError from "../components/DataError";
import { useUserLocation } from "../useUserLocation";

function Directory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState<"list" | "map">("list");
  const userLocation = useUserLocation();

  const activeCategory = searchParams.get("category");
  const searchQuery = searchParams.get("q") || "";

  useEffect(() => {
    document.title = `Directory — ${SITE_NAME}`;
  }, []);

  const filtered = useMemo(() => {
    if (!listingsResult.success) return [];
    const { listings } = listingsResult;

    let results = activeCategory
      ? listings.filter((l) => l.category === activeCategory)
      : listings;

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      results = results.filter(
        (l) =>
          l.name.toLowerCase().includes(query) ||
          l.description.toLowerCase().includes(query) ||
          l.address.toLowerCase().includes(query) ||
          l.category.toLowerCase().includes(query),
      );
    }

    return results;
  }, [activeCategory, searchQuery]);

  if (!listingsResult.success) {
    return <DataError error={listingsResult.error} />;
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Directory</h1>
          <p className="mt-2 text-gray-600">
            Browse verified local services and resources in Johnston.
          </p>
        </div>
        <div
          className="flex rounded-lg border border-gray-200"
          role="group"
          aria-label="View mode"
        >
          <button
            onClick={() => setView("list")}
            aria-pressed={view === "list"}
            className={`rounded-l-lg px-3 py-2 text-sm focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 ${
              view === "list"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            List
          </button>
          <button
            onClick={() => setView("map")}
            aria-pressed={view === "map"}
            className={`rounded-r-lg px-3 py-2 text-sm focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 ${
              view === "map"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Map
          </button>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="directory-search" className="sr-only">
          Search listings
        </label>
        <input
          id="directory-search"
          type="search"
          placeholder="Search by name, description, or address..."
          value={searchQuery}
          onChange={(e) => {
            const next = new URLSearchParams(searchParams);
            if (e.target.value) {
              next.set("q", e.target.value);
            } else {
              next.delete("q");
            }
            setSearchParams(next);
          }}
          className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-600 focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => {
            const next = new URLSearchParams();
            if (searchQuery) next.set("q", searchQuery);
            setSearchParams(next);
          }}
          className={`rounded-full px-3 py-1 text-sm focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 ${
            !activeCategory
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              const next = new URLSearchParams({ category });
              if (searchQuery) next.set("q", searchQuery);
              setSearchParams(next);
            }}
            className={`rounded-full px-3 py-1 text-sm focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 ${
              activeCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {view === "map" ? (
        <div className="mt-8">
          <ListingMap
            listings={filtered}
            className="h-[500px]"
            userLocation={userLocation}
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {filtered.map((listing) => (
            <Link
              key={listing.id}
              to={`/directory/${listing.id}`}
              className="rounded-lg border border-gray-200 bg-white p-5 hover:border-blue-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
            >
              <span className="text-xs font-medium text-blue-600">
                {listing.category}
              </span>
              <h2 className="mt-1 text-lg font-semibold text-gray-900">
                {listing.name}
              </h2>
              <p className="mt-1 text-sm text-gray-600">{listing.address}</p>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                {listing.description}
              </p>
            </Link>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-gray-500">
          No listings found. Try a different search term or category.
        </p>
      )}
    </div>
  );
}

export default Directory;
