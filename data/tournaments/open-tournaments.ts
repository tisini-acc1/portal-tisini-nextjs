import "server-only";
import { cache } from "react";
import { getToken } from "@/actions/actions";

export const getOpenTournaments = cache(
  async (): Promise<OpenCompetition[]> => {
    const token = await getToken();
    const baseURL = process.env.NEXT_PUBLIC_API_HOST;

    try {
      const res = await fetch(`${baseURL}?gettoken=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "fetchleague",
        }),
        next: {
          revalidate: 60,
          tags: ["open-leagues"],
        },
      });

      if (!res.ok) {
        // console.log("server", res.data);
        throw new Error(`Failed to fetch open tournaments: ${res.status}`);
      }
      return await res.json();
    } catch (error: any) {
      console.log(error);
      throw new Error(
        error.message || "An error occurred while fetching open tournaments."
      );
    }
  }
);
