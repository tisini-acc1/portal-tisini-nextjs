"use server";

import { cache } from "react";
import { getToken } from "@/app/auth/actions";

export const getTeamTransfers = cache(
  async (teamId: string): Promise<Transfer[]> => {
    const token = await getToken();
    const baseURL = process.env.NEXT_PUBLIC_API_HOST;

    try {
      const res = await fetch(`${baseURL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "teamtransfer",
          teamid: teamId,
          gettoken: token,
        }),
        next: { revalidate: 60, tags: [`team-transfers-${teamId}`] },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch team transfers: ${res.status}`);
      }

      return await res.json();
    } catch (error: any) {
      console.log(error);
      throw new Error(
        error.message || "An error occurred while team transfers."
      );
    }
  }
);
