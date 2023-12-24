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
  const url = BASE_URL + "/users/teams/";

  const res = await fetch(url, {
    method: "GET",
    headers: { Authorization: `JWT ${session?.access_token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch teams data");

  return res.json();
};
