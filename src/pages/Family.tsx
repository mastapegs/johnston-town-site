import { useEffect } from "react";

function Family() {
  useEffect(() => {
    document.title = "Family — Johnston Community Directory";
  }, []);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900">Our Family</h1>

      <div className="mt-6">
        <img
          src="/family.jpg"
          alt="A father and daughter making silly faces together"
          className="w-full rounded-lg shadow-md"
        />
      </div>

      <p className="mt-6 text-gray-700">
        This project is built by a Johnston neighbor &mdash; a dad who wants to
        make it easier for families like ours to find the resources our
        community has to offer.
      </p>
    </div>
  );
}

export default Family;
