"use server";

import { cache } from "react";

import { getToken } from "@/actions/actions";

export const getUserTeams = cache(async (): Promise<Team[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await fetch(`${baseURL}?gettoken=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "userteam",
      }),
      next: {
        revalidate: 60, // Time-based revalidation (ISR)
        tags: ["user-teams"], // For on-demand revalidation
      },
    });

    if (!res.ok) throw new Error(`Failed to fetch user teams: ${res.status}`);

    return await res.json();
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "An error occurred while fetching teams.");
  }
});
