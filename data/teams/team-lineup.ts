import "server-only";

import { cache } from "react";
import { getToken } from "@/app/auth/actions";

export const getTeamLineup = cache(
  async (fixId: string, teamId: string): Promise<Lineup[]> => {
    const token = await getToken();
    const baseURL = process.env.NEXT_PUBLIC_API_HOST;

    try {
      const res = await fetch(`${baseURL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gettoken: token,
          action: "fixturelineup",
          fixture: fixId,
          teamid: teamId,
        }),
        next: {
          revalidate: 60,
          tags: ["team-lineups-${teamId}-${fixId}"],
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch team lineups: ${res.status}`);
      }

      return await res.json();
    } catch (error: any) {
      console.log(error);
      throw new Error(
        error.message || "An error occurred while fetching team lineups."
      );
    }
  }
);
