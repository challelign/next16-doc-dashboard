"use client";

import { useEffect, useMemo } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isDev = process.env.NEXT_PUBLIC_ON_PRODUCTION === "FALSE";

  useEffect(() => {
    console.error("[Error Boundary]", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  // Try to parse JSON validation errors
  const parsedErrors = useMemo(() => {
    try {
      const json = JSON.parse(error.message);
      return Array.isArray(json) ? json : null;
    } catch {
      return null;
    }
  }, [error.message]);

  return (
    <main className="flex flex-col justify-center items-center gap-4 p-6 text-center">
      <h2 className="font-semibold text-lg">Unexpected Error</h2>

      {isDev && (
        <div className="space-y-2 w-full max-w-lg text-left">
          <p className="text-gray-600 text-sm">OPTION 1:</p>
          <pre className="bg-red-50 p-2 border border-red-200 rounded max-w-md overflow-auto text-red-500 text-xs">
            {" "}
            {error.message}{" "}
          </pre>

          <p className="text-gray-600 text-sm">OPTION 2:</p>
          {parsedErrors ? (
            parsedErrors.map((e: any, i: number) => (
              <div
                key={i}
                className="bg-red-50 p-3 border border-red-300 rounded text-sm"
              >
                <div className="font-semibold text-red-700">
                  {e.path?.join(".")}
                </div>
                <div className="text-red-600">{e.message}</div>
                <div className="mt-1 text-[10px] text-gray-500">
                  Expected: {e.expected} — Received: {e.received}
                </div>
              </div>
            ))
          ) : (
            <pre className="bg-red-50 p-2 border border-red-200 rounded overflow-auto text-red-600 text-xs">
              {error.message}
            </pre>
          )}
        </div>
      )}

      <p className="text-gray-600 text-sm">
        We’re unable to load this section right now. Please try again.
      </p>

      <button
        onClick={reset}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white text-sm transition"
      >
        Try again
      </button>
    </main>
  );
}
