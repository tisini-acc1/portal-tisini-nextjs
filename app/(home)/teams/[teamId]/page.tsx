"use client";

import { getTeamOverview } from "@/data/overview/overview";
import TeamOverview from "@/app/(home)/teams/components/teams/overview/team-overview";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../loading";

const TeamsPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["overview"],
    queryFn: () => getTeamOverview(),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return <TeamOverview overviewData={data as TeamOverview[]} />;
};

export default TeamsPage;
