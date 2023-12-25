import getSession from "./teams";

const BASE_URL = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

export const getAllPlayers = async (teamId: string) => {
  const session = await getSession();
  const url = BASE_URL + `/users/teams/${teamId}/players/`;

  const res = await fetch(url, {
    method: "GET",
    headers: { Authorization: `JWT ${session?.access_token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch players data");

  return res.json();
};