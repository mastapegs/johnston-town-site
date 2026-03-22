import { useEffect } from "react";

function Terms() {
  useEffect(() => {
    document.title = "Terms of Service — Johnston Community Directory";
  }, []);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>

      <div className="mt-6 space-y-4 text-gray-700">
        <h2 className="text-xl font-semibold text-gray-900">Disclaimer</h2>
        <p>
          The Johnston Community Directory is an independent community project.
          It is <strong>not affiliated with or endorsed by</strong> the Town of
          Johnston, the State of Rhode Island, or any government agency. This
          site is not an official government service.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">
          Use at Your Own Risk
        </h2>
        <p>
          This site and its content are provided &ldquo;as-is&rdquo; without
          warranty of any kind, express or implied. We make no guarantees about
          the completeness, accuracy, or reliability of any information on this
          site.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">
          Listing Accuracy
        </h2>
        <p>
          All listings are manually researched and verified at the time of
          inclusion. However, information such as hours of operation, phone
          numbers, addresses, and service availability may change without
          notice. <strong>Always contact services directly</strong> to confirm
          hours, eligibility, and availability before visiting.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">
          Limitation of Liability
        </h2>
        <p>
          The site owner and contributors are not liable for any actions taken
          based on information found on this site. This includes, but is not
          limited to, any losses, injuries, or damages resulting from reliance
          on listing information.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">External Links</h2>
        <p>
          This site may contain links to external websites. We are not
          responsible for the content, privacy practices, or availability of
          those external sites.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
        <p>
          If you have questions about these terms or believe a listing contains
          inaccurate information, please contact us at{" "}
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

export default Terms;
