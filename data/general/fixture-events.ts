import "server-only";
import { cache } from "react";

import { getToken } from "@/app/auth/actions";

export const getEvents = cache(async (type: string): Promise<EventType[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await fetch(`${baseURL}?gettoken=${token}`, {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({
        getmainevent: "event",
        fixture_type: type,
      }),
      next: { revalidate: 3600, tags: [`fixtureEvents-${type}`] },
    });

    if (!res.ok)
      throw new Error(`Failed to fetch fixture events: ${res.status}`);

    return await res.json();
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching fixture events."
    );
  }
});
