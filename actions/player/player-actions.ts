"use server";

import axios from "axios";
import { getToken } from "../actions";

// Get All Players
export const mergePlayers = async (cur: string, dup: string) => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "mergeplayer",
      currentplayerid: cur,
      duplicateplayerid: dup,
      gettoken: token,
    });

    // return res;
    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to merge players: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while merging players."
    );
  }
};
