interface HeroSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

function HeroSearch({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}: HeroSearchProps) {
  return (
    <section className="py-10 text-center">
      <h1 className="text-4xl font-bold text-gray-900">
        Welcome to Johnston, RI
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-gray-700">
        Your neighbor-built guide to local services, resources, and
        organizations &mdash; all in one place.
      </p>

      <form
        onSubmit={onSearchSubmit}
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
          onChange={(e) => onSearchChange(e.target.value)}
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
  );
}

export default HeroSearch;
