"use client"; // Error components must be Client Components
import { useEffect } from "react";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("ui error :" + error);
  }, [error]);
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold">Something went wrong!</h2>
      <button
        className="text-lg text-fabric-700 transition-all ease-linear hover:text-blue-500 hover:underline"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
