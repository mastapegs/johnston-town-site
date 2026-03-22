import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { Listing } from "../data/listings";
import { SITE_NAME } from "../config";
import HeroSearch from "../components/HeroSearch";
import StatsSection from "../components/StatsSection";
import CategoryGrid from "../components/CategoryGrid";
import MissionBanner from "../components/MissionBanner";

function Home({ listings }: { listings: Listing[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = SITE_NAME;
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
      <HeroSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearch}
      />

      <StatsSection listings={listings} />

      <CategoryGrid />

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

      <MissionBanner />

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
