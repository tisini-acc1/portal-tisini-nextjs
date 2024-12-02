"use server";

import axios from "axios";

import { getToken } from "@/actions/actions";

// Get Team Players
export const getPlayers = async (teamId: number): Promise<Player[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

  try {
    const res = await axios.get(`${baseURL}/teams/${token}/${teamId}/players/`);

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch players: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching players."
    );
  }
};
