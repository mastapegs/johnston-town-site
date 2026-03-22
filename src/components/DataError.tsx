import type { ZodError } from "zod";

function DataError({ error }: { error: ZodError }) {
  const issues = error.issues.slice(0, 10);

  return (
    <div
      role="alert"
      className="rounded-lg border border-red-300 bg-red-50 p-6"
    >
      <h2 className="text-lg font-semibold text-red-800">Listing Data Error</h2>
      <p className="mt-1 text-sm text-red-700">
        The listing data failed validation. This is a build-time issue — please
        check <code className="font-mono">src/data/listings.json</code>.
      </p>
      <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-red-700">
        {issues.map((issue, i) => (
          <li key={i}>
            <code className="font-mono">{issue.path.join(".")}</code>:{" "}
            {issue.message}
          </li>
        ))}
      </ul>
      {error.issues.length > 10 && (
        <p className="mt-2 text-sm text-red-600">
          …and {error.issues.length - 10} more issue
          {error.issues.length - 10 === 1 ? "" : "s"}.
        </p>
      )}
    </div>
  );
}

export default DataError;
