"use client";

import Image from "next/image";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <main className="bg-error bg-center bg-cover bg-no-repeat h-screen text-white flex items-center justify-center rounded-md">
          <div className="flex flex-col items-center justify-center gap-8">
            <Image
              src={"/error-icon-14.jpg"}
              alt="error icon"
              width={100}
              height={100}
            />
            <h2 className="text-2xl">Something went wrong!</h2>
            <button
              className="border p-1 px-3 rounded-sm hover:bg-red-800"
              onClick={() => reset()}
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
