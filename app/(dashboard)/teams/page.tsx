"use client";

import { useQuery } from "@tanstack/react-query";
// import { getTeamOverview } from "@/data/overview/overview";
import Loading from "../loading";
import { getTeamOverview } from "@/data/overview/overview";
import TeamOverview from "@/components/teams/overview/team-overview";

const TeamsPage = () => {
  // const data = await getTeamOverview();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["overview"],
    queryFn: () => getTeamOverview(),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.log(isError);
    return <div>Error</div>;
  }

  console.log(data);

  return <TeamOverview overviewData={data as TeamOverview[]} />;
};

export default TeamsPage;
