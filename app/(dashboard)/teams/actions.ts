"use server";

import axios from "axios";

import { getToken } from "@/app/auth/actions";

//  {"action":"fixtures","fixtureid":1}
export const SubscribetoTournament = async (data: {
  seasonid: string;
  teamid: string;
}) => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "subscribe",
      ...data,
      gettoken: token,
    });

    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(`Failed to modify fixture online status: ${res.status}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    }
    throw new Error("An error occurred while modifying fixture status.");
  }
};
