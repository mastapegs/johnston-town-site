import { Link } from "react-router";
import { categories } from "../data/listings";

function CategoryGrid() {
  return (
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
  );
}

export default CategoryGrid;
