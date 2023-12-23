import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/options";

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
  // console.log(session);
  return (
    <div className="space-y-2">
      <span className="font-bold text-4xl">Home</span>
      <div className="border-dashed border border-zinc-500 w-full h-12 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
    </div>
  );
};

export default HomePage;
