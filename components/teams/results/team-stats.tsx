"use client";

import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/lib/store";
import { getFixtureStats } from "@/actions/php-actions";
import RugbyTeamStats from "../team-stats/rugby-team-stats";
import { rugbyData } from "@/actions/fix-data";
import FootballTeamStats from "../team-stats/football-team-stats";

const TeamStats = () => {
  const { user } = useStore((state) => state);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["fixStats", user.fixture],
    queryFn: () => getFixtureStats(user.fixture),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>error...</div>;
  }

  const fixType = data && data["fixture"][0].fixture_type;

  const rugby = rugbyData(data as SingleFixtureStats);

  return (
    <>
      {fixType === "rugby15" || fixType === "rugby7" ? (
        <RugbyTeamStats data={data as SingleFixtureStats} />
      ) : (
        <FootballTeamStats data={data as SingleFixtureStats} />
      )}
    </>
  );
};

export default TeamStats;
