import { cache } from "react";

export const getCountryCodes = cache(async (): Promise<Country[]> => {
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await fetch(`${baseURL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "nationality",
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch countries: ${res.status}`);
    }

    return await res.json();
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching countries."
    );
  }
});
