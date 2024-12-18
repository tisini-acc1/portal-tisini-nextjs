"use client";

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
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
