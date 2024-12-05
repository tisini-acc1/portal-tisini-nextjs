"use server";

import axios from "axios";
import { getToken } from "./actions";

// Get Team Players
export const getTournaments = async (): Promise<Competition[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}?gettoken=${token}`, {
      action: "usertournament",
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch tournaments: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching user tournaments."
    );
  }
};
