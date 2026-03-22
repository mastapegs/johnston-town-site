import { useEffect } from "react";

function Privacy() {
  useEffect(() => {
    document.title = "Privacy Policy — Johnston Community Directory";
  }, []);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>

      <div className="mt-6 space-y-4 text-gray-700">
        <p>
          The Johnston Community Directory is committed to protecting your
          privacy. This policy explains what information we collect (or
          don&apos;t) when you visit our site.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">
          Information We Collect
        </h2>
        <p>
          <strong>We do not collect any personal information.</strong> This site
          does not use cookies, analytics trackers, or any form of user
          tracking. We do not require you to create an account, sign in, or
          provide any personal data to use this directory.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">
          Third-Party Services
        </h2>
        <p>
          This site uses OpenStreetMap for embedded maps and Open Meteo for
          weather data. These services may process your IP address when loading
          map tiles or weather information. We do not control the data practices
          of these third-party services. Please refer to their respective
          privacy policies for more information.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">
          Data We Do Not Collect
        </h2>
        <ul className="list-inside list-disc space-y-1">
          <li>No cookies are set by this site</li>
          <li>No analytics or tracking scripts are used</li>
          <li>No personal data is collected, stored, or sold</li>
          <li>No user accounts or login information is required</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900">
          Changes to This Policy
        </h2>
        <p>
          If we add analytics in the future (such as privacy-respecting,
          aggregate page view counts), this policy will be updated to reflect
          what is collected. Any analytics tool we adopt will collect only
          aggregate, non-personally-identifiable data.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
        <p>
          If you have questions about this privacy policy, please contact us at{" "}
          <a
            href="mailto:mastapegs01@gmail.com"
            className="text-blue-700 underline hover:text-blue-900 focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
          >
            mastapegs01@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default Privacy;
