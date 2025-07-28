import "server-only";
import { cache } from "react";
import { getToken } from "@/actions/actions";

export const getPlayersData = cache(
  async (fixId: string, player: number): Promise<TeamPlayerData> => {
    const token = await getToken();
    const baseURL = process.env.NEXT_PUBLIC_API_HOST;

    try {
      const res = await fetch(`${baseURL}`, {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({
          action: "playerdata",
          fixture: fixId,
          playerid: player,
          gettoken: token,
        }),
        next: { revalidate: 60, tags: [`playerData-${fixId}-${player}`] },
      });

      if (!res.ok) throw new Error(`Failed to fixture stats: ${res.status}`);

      return await res.json();

      // if (res.status === 200) {
      //   console.log("server", res.data);
      //   if (res.data.error === "1") {
      //     throw new Error(
      //       res.data.message || "The fixture has not been paid for"
      //     );
      //   }
      //   return res.data;
      // } else {
      //   throw new Error(`Failed to fixture stats: ${res.status}`);
      // }
    } catch (error: any) {
      console.log(error);
      throw new Error(
        error.message || "An error occurred while fetching fixture stats."
      );
    }
  }
);
