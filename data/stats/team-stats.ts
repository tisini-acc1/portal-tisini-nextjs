import "server-only";
import { cache } from "react";
import { getToken } from "@/app/auth/actions";

export const getFixtureStats = cache(
  async (fixId: string): Promise<FixtureData> => {
    const token = await getToken();
    const baseURL = process.env.NEXT_PUBLIC_API_HOST;

    try {
      const res = await fetch(`${baseURL}`, {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({
          action: "teamdata",
          fixture: fixId,
          gettoken: token,
        }),
        next: { revalidate: 60, tags: [`teamData-${fixId}`] },
      });

      if (!res.ok) throw new Error(`Failed to fixture stats: ${res.status}`);

      return await res.json();
    } catch (error: any) {
      console.log(error);
      throw new Error(
        error.message || "An error occurred while fetching fixture stats."
      );
    }
  }
);
