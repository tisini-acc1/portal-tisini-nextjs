"use server";

import { cache } from "react";

import { getToken } from "@/app/auth/actions";

// Get All Players
export const getTeamPlayers = cache(
  async (teamId: string): Promise<Player[]> => {
    const token = await getToken();
    const baseURL = process.env.NEXT_PUBLIC_API_HOST;

    try {
      const res = await fetch(`${baseURL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "players",
          team_id: teamId,
          gettoken: token,
        }),
        next: {
          revalidate: 3600,
          tags: [`players-${teamId}`], // For on-demand revalidation
        },
      });

      if (!res.ok) throw new Error(`Failed to fetch players: ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error(`Error fetching players for team ${teamId}:`, error);
      throw error;
    }
  }
);

// export const preloadTeamPlayers = (teamId: string) => {
//   void getTeamPlayers(teamId);
// };
