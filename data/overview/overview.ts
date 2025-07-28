import "server-only";
import { getToken } from "@/actions/actions";
import { cache } from "react";

export const getTeamOverview = cache(async (): Promise<TeamOverview[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

  console.log(`${baseURL}/api/team_overview/${token}/`);

  try {
    const res = await fetch(`${baseURL}/api/team_overview/${token}/`, {
      next: { revalidate: 60, tags: ["team-overview"] },
    });

    //   console.log("server 137:", res.data);
    if (!res.ok)
      throw new Error(`Failed to fetch team overview: ${res.status}`);

    return await res.json();
  } catch (error: any) {
    console.log(error.message);
    throw new Error(
      error.message || "An error occurred while fetching team overview."
    );
  }
});
