function About() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900">About This Project</h1>

      <div className="mt-6 space-y-4 text-gray-700">
        <p>
          Johnston Community Directory is a free, publicly accessible website
          built to help Johnston, RI residents find local services, resources,
          and businesses &mdash; all in one place.
        </p>
        <p>
          With a population of over 30,000, Johnston has a lot to offer. But
          finding the right resource &mdash; whether it&apos;s a food pantry,
          childcare, senior services, or a town office &mdash; can mean
          searching across dozens of websites, outdated PDFs, or word of mouth.
        </p>
        <p>
          This directory aims to change that. Every listing is manually
          researched and verified to ensure accuracy. No algorithms, no ads, no
          data collection &mdash; just useful information for our community.
        </p>
      </div>

      <h2 className="mt-10 text-xl font-semibold text-gray-900">
        Our Principles
      </h2>
      <ul className="mt-4 list-inside list-disc space-y-2 text-gray-700">
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
          <strong>Built by a neighbor</strong> &mdash; local perspective, local
          care
        </li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold text-gray-900">
        Want to Help?
      </h2>
      <p className="mt-4 text-gray-700">
        Know a local resource that should be listed? Have a correction?
        Community input is coming soon. In the meantime, we&apos;re focused on
        building out a solid foundation of verified listings.
      </p>
    </div>
  );
}

export default About;
