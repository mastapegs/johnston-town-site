import { Link, NavLink, Outlet } from "react-router";
import WeatherDisplay from "./WeatherDisplay";

function Layout() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-blue-700 font-semibold focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
      : "text-gray-700 hover:text-gray-900 focus:outline-2 focus:outline-offset-2 focus:outline-blue-600";

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
          >
            Johnston Town Site
          </Link>
          <div className="flex items-center gap-6">
            <nav aria-label="Main navigation" className="flex gap-6 text-sm">
              <NavLink to="/" end className={linkClass}>
                Home
              </NavLink>
              <NavLink to="/directory" className={linkClass}>
                Directory
              </NavLink>
              <NavLink to="/about" className={linkClass}>
                About
              </NavLink>
            </nav>
            <WeatherDisplay />
          </div>
        </div>
      </header>

      <main
        id="main-content"
        className="mx-auto w-full max-w-5xl flex-1 px-4 py-8"
      >
        <Outlet />
      </main>

      <footer className="border-t border-gray-200">
        <div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm">
          <p style={{ backgroundColor: "#fff", color: "#111827" }}>
            Johnston Community Directory &mdash; built by a neighbor, for
            neighbors.
          </p>
          <p
            className="mt-1"
            style={{ backgroundColor: "#fff", color: "#111827" }}
          >
            Free to use, always.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
