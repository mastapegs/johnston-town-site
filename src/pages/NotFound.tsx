import { useEffect } from "react";
import { Link } from "react-router";
import { SITE_NAME } from "../config";

function NotFound() {
  useEffect(() => {
    document.title = `Page Not Found — ${SITE_NAME}`;
  }, []);

  return (
    <div className="mx-auto max-w-2xl py-16 text-center">
      <h1 className="text-3xl font-bold text-gray-900">Page Not Found</h1>
      <p className="mt-4 text-gray-700">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
      >
        Go to Home Page
      </Link>
    </div>
  );
}

export default NotFound;
