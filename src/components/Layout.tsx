import { Link, NavLink, Outlet } from "react-router";
import WeatherDisplay from "./WeatherDisplay";

function Layout() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-gray-900";

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-xl font-bold text-gray-900">
            Johnston Town Site
          </Link>
          <div className="flex items-center gap-6">
            <nav className="flex gap-6 text-sm">
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

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-gray-500">
          <p>
            Johnston Community Directory &mdash; built by a neighbor, for
            neighbors.
          </p>
          <p className="mt-1">Free to use, always.</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
