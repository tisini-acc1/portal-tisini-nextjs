import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const BASE_URL = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

const getSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export default getSession;

export const getMyTeams = async () => {
  const session = await getSession();
  const url = BASE_URL + "/api/teams/";

  const res = await fetch(url, {
    method: "GET",
    headers: { Authorization: `JWT ${session?.accessToken}` },
  });

  if (!res.ok) throw new Error("Failed to fetch teams data");

  return res.json();
};

export const getTeam = async (id: string) => {
  const session = await getServerSession(authOptions);
  const url = BASE_URL + `/api/teams/${id}`;

  const res = await fetch(url, {
    method: "GET",
    headers: { Authorization: `JWT ${session?.accessToken}` },
  });

  if (!res.ok) throw new Error("Failed to fetch team data");

  return res.json();
};
