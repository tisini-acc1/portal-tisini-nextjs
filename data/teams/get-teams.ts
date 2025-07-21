"use server";

import { cache } from "react";

import { getToken } from "@/actions/actions";

// 1. Create a cached fetch function
const cachedFetchTeams = cache(async (): Promise<AllTeam[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  if (!baseURL) throw new Error("API host not configured");

  const res = await fetch(`${baseURL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "teams",
      gettoken: token,
    }),
    next: {
      revalidate: 3600, // Time-based revalidation (ISR)
      tags: ["teams"], // For on-demand revalidation
    },
  });

  if (!res.ok) throw new Error(`Failed to fetch teams: ${res.status}`);
  return await res.json();
});

// 2. Export the function with preloading capability
export const getAllTeams = cachedFetchTeams;

// 3. Proper async preload function
export const preloadTeams = async () => {
  try {
    await cachedFetchTeams();
  } catch (error) {
    console.error("Preload failed:", error);
    // Don't throw in preload to avoid breaking the page
  }
};
