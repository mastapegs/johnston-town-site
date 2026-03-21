import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { categories, listings } from "../data/listings";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Johnston Community Directory";
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate(`/directory?q=${encodeURIComponent(trimmed)}`);
    } else {
      navigate("/directory");
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="py-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to Johnston, RI
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-700">
          Your neighbor-built guide to local services, resources, and
          organizations &mdash; all in one place.
        </p>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          role="search"
          className="mx-auto mt-8 flex max-w-lg gap-2"
        >
          <label htmlFor="home-search" className="sr-only">
            Search the directory
          </label>
          <input
            id="home-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for food banks, childcare, town hall..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-600 focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
          >
            Search
          </button>
        </form>
      </section>

      {/* Quick stats */}
      <section aria-label="Directory statistics">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="rounded-lg border border-gray-200 bg-white px-4 py-6">
            <p className="text-3xl font-bold text-blue-700">
              {listings.length}
            </p>
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

      {/* Categories */}
      <section>
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/directory?category=${encodeURIComponent(category)}`}
              className="rounded-lg border border-gray-200 bg-white p-4 text-center text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-700 focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      {/* About Johnston */}
      <section className="rounded-lg border border-gray-200 bg-white p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-gray-900">About Johnston</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              Johnston is a town of over 30,000 residents in Providence County,
              Rhode Island. Incorporated in 1759, it sits at the geographic
              center of the state.
            </p>
            <p>
              From local parks and recreation to essential municipal services,
              Johnston has a lot to offer &mdash; but finding the right resource
              can mean searching across dozens of websites, outdated PDFs, or
              word of mouth.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <div>
              <dt className="font-medium text-gray-900">Population</dt>
              <dd className="text-gray-700">~30,000</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">ZIP Code</dt>
              <dd className="text-gray-700">02919</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">County</dt>
              <dd className="text-gray-700">Providence</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">Incorporated</dt>
              <dd className="text-gray-700">1759</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">State</dt>
              <dd className="text-gray-700">Rhode Island</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">Known For</dt>
              <dd className="text-gray-700">Geographic center of RI</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Mission / trust */}
      <section className="rounded-lg border border-blue-100 bg-blue-50 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Built by a Neighbor
        </h2>
        <p className="mt-3 text-sm text-gray-700">
          Every listing in this directory is manually researched and verified.
          No algorithms, no ads, no data collection &mdash; just useful
          information for our community.
        </p>
        <ul className="mt-4 grid list-inside list-disc gap-3 text-sm text-gray-700 sm:grid-cols-2">
          <li>
            <strong>Community first</strong> &mdash; solve real resident needs
          </li>
          <li>
            <strong>Accuracy over volume</strong> &mdash; every listing is
            verified
          </li>
          <li>
            <strong>Free to use, always</strong> &mdash; no paywalls or hidden
            costs
          </li>
          <li>
            <strong>Open and transparent</strong> &mdash; local perspective,
            local care
          </li>
        </ul>
        <Link
          to="/about"
          className="mt-5 inline-block text-sm font-medium text-blue-700 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
        >
          Learn more about this project &rarr;
        </Link>
      </section>

      {/* Need help now */}
      <section className="rounded-lg border border-gray-200 bg-white p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Need Immediate Help?
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          For urgent needs, call{" "}
          <strong>
            <a
              href="tel:211"
              className="text-blue-700 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
            >
              2-1-1
            </a>
          </strong>{" "}
          &mdash; Rhode Island&apos;s free, confidential helpline available 24/7
          for food, housing, health care, and more.
        </p>
      </section>
    </div>
  );
}

export default Home;
