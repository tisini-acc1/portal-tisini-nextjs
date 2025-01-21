"use server";

import axios from "axios";
import { getToken } from "./actions";

export const getStatement = async (): Promise<WalletStatement[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "statement",
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to statement: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching wallet statement."
    );
  }
};
