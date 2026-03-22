import { Link } from "react-router";

function MissionBanner() {
  return (
    <section className="rounded-lg border border-blue-100 bg-blue-50 p-6 sm:p-8">
      <h2 className="text-2xl font-semibold text-gray-900">
        Built by a Neighbor
      </h2>
      <p className="mt-3 text-sm text-gray-700">
        Every listing in this directory is manually researched and verified. No
        algorithms, no ads, no data collection &mdash; just useful information
        for our community.
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
          <strong>Open and transparent</strong> &mdash; local perspective, local
          care
        </li>
      </ul>
      <Link
        to="/about"
        className="mt-5 inline-block text-sm font-medium text-blue-700 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
      >
        Learn more about this project &rarr;
      </Link>
    </section>
  );
}

export default MissionBanner;
