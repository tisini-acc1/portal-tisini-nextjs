"use client";

import { useSession } from "next-auth/react";
import axios from "../axios";

const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res: any = await axios.post("/auth/refresh_token/", {
      refresh_token: session?.refreshToken,
    });
    console.log("refresh called");
    if (session) session.accessToken === res.data.access_token;
  };

  return refreshToken;
};

export default useRefreshToken;
