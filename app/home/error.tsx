"use client";

import Image from "next/image";
// import { resetAuthCookies } from "@/actions/actions";
// import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.log(error);
    // console.log(
    //   error.message === "The specified User doesn't have tournament role"
    // );
    // if (error.message === "The specified User doesn't have tournament role") {
    //   // Redirect the user to the login page
    //   resetAuthCookies();
    //   router.push("/auth/login"); // Adjust the path as per your application
    // }
  }, [error]);

  return (
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
  );
}
