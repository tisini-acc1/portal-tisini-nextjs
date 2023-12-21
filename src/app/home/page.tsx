import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/options";
import LogOut from "./sign-out";

const getMyTeams = async () => {
  const session = await getServerSession(authOptions);
  const url = process.env.DJANGO_BASE_URL + "/users/teams/";
  const res = await fetch(url, {
    method: "GET",
    headers: { Authorization: `JWT ${session?.access_token}` },
  });

  if (!res.ok)
    throw new Error(`Failed to fetch teams, ${res.status}, ${res.statusText}`);

  return res.json();
};

const HomePage = async () => {
  const teams = await getMyTeams();
  console.log(teams);

  return (
    <div>
      HomePage
      <LogOut />
    </div>
  );
};

export default HomePage;
