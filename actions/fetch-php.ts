import { apiPost } from "@/lib/api";
import { getToken } from "./actions";

// Fetch player fixtures
export const getPlayerFixtures = async () => {
  const token = await getToken();

  const data = await apiPost({
    action: "fixtures",
    playerid: 6857,
    gettoken: token,
  });

  if (data.error === "1") {
    throw new Error(data.message || "The fixture has not been paid for");
  }

  return data;
};

// Fetch users details
export const getUsers = async () => {
  const token = await getToken();

  const data = await apiPost({ action: "users", userid: 7, gettoken: token });

  return data;
};
