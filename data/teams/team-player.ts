import "server-only";
import { cache } from "react";
import { getToken } from "@/app/auth/actions";

export const getAllPlayers = cache(
  async (teamId: string): Promise<TeamPlayer[]> => {
    const token = await getToken();
    const baseURL = process.env.NEXT_PUBLIC_API_HOST;

    try {
      const res = await fetch(`${baseURL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "teamplayers",
          teamid: parseInt(teamId),
          gettoken: token,
        }),
        next: {
          revalidate: 60,
          tags: [`teamPlayers-${teamId}`],
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch players for team: ${res.status}`);
      }

      return await res.json();
    } catch (error: any) {
      console.log(error);
      throw new Error(
        error.message || "An error occurred while fetching players."
      );
    }
  }
);
