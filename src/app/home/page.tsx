import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/options";
import LogOut from "./sign-out";
import GetTeams from "./getTeams";

const getMyTeams = async () => {
  const session = await getServerSession(authOptions);
  const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL + "/users/teams/";
  const res = await fetch(url, {
    method: "GET",
    headers: { Authorization: `JWT ${session?.access_token}` },
  });

  if (!res.ok)
    throw new Error(`Failed to fetch teams, ${res.status}, ${res.statusText}`);

  return res.json();
};

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  // const teams = await getMyTeams();

  // console.log(teams);
  console.log(session);
  return (
    <div>
      HomePage
      <LogOut />
      <GetTeams />
    </div>
  );
};

export default HomePage;
