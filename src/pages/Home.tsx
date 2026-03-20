import { Link } from "react-router";
import { categories } from "../data/listings";

function Home() {
  return (
    <div className="space-y-12">
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Johnston Community Directory
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Find local services, resources, and organizations in Johnston, RI
          &mdash; all in one place.
        </p>
        <Link
          to="/directory"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
        >
          Browse the Directory
        </Link>
      </section>

      <section>
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900">
          Categories
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/directory?category=${encodeURIComponent(category)}`}
              className="rounded-lg border border-gray-200 bg-white p-4 text-center text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
