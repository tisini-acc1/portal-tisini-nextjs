import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/options";
import CreateTeamCard from "./components/create-team-card";

const getMyTeams = async () => {
  const session = await getServerSession(authOptions);
  const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL + "/users/teams/";

  const res = await fetch(url, {
    method: "GET",
    headers: { Authorization: `JWT ${session?.access_token}` },
  });

  if (!res.ok) throw new Error(`Failed to fetch teams`);

  return res.json();
};

const HomePage = async () => {
  const teamsData: Promise<Team[]> = getMyTeams();
  const teams = await teamsData;

  console.log(teams.length);
  // console.log(session);

  if (teams.length === 0) return <CreateTeamCard />;

  return <main>Home</main>;
};

export default HomePage;
