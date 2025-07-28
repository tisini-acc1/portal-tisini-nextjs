import "server-only";
import { cache } from "react";

import { getToken } from "@/actions/actions";

export const getTeamTournaments = cache(
  async (teamId: string, playerId: string): Promise<TeamTournament[]> => {
    const token = await getToken();
    const baseURL = process.env.NEXT_PUBLIC_API_HOST;

    try {
      const res = await fetch(`${baseURL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "teamtournamentseries",
          teamid: teamId,
          playerid: playerId,
          gettoken: token,
        }),
        next: {
          revalidate: 60,
          tags: [`team-tournaments-${teamId}-${playerId}`],
        },
      });

      // console.log(res.status, res.statusText);

      if (!res.ok)
        throw new Error(`Failed to fetch tournaments for team: ${res.status}`);

      return await res.json();
    } catch (error: any) {
      console.log(error);
      throw new Error(
        error.message || "An error occurred while fetching tournament teams."
      );
    }
  }
);
