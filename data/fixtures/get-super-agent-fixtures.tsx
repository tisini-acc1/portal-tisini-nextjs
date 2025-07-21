import "server-only";
import { cache } from "react";
import { getToken } from "@/actions/actions";

export const getSuperAgentFixtures = cache(
  async (): Promise<AgentFixture[]> => {
    const token = await getToken();
    const baseURL = process.env.NEXT_PUBLIC_API_HOST;

    if (!baseURL) {
      throw new Error("API host not configured");
    }

    try {
      const res = await fetch(`${baseURL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "fixtures",
          all: "",
          limit: "100",
          from: "0",
          gettoken: token,
        }),
        next: {
          revalidate: 60,
          tags: ["super-agent-fixtures"],
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch tournaments for team: ${res.status}`);
      }

      return await res.json();
    } catch (error: any) {
      console.error("Fetch error:", error);
      throw new Error(
        error.message || "An error occurred while fetching tournament teams."
      );
    }
  }
);
