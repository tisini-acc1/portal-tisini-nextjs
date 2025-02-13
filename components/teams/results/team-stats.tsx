"use client";

import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/lib/store";
// import { rugbyData } from "@/actions/fix-data";
import { getFixtureStats } from "@/actions/php-actions";
import RugbyTeamStats from "../team-stats/rugby-team-stats";
import FootballTeamStats from "../team-stats/football-team-stats";

const TeamStats = () => {
  const { store } = useStore((state) => state);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["fixStats", store.fixture],
    queryFn: () => getFixtureStats(store.fixture),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>error...</div>;
  }

  const fixType = data && data["fixture"][0].fixture_type;

  // const rugby = rugbyData(data as SingleFixtureStats);
  // console.log(data);
  return (
    <>
      {fixType === "rugby15" || fixType === "rugby7" ? (
        <RugbyTeamStats data={data as FixtureData} />
      ) : (
        <FootballTeamStats data={data as FixtureData} />
      )}
    </>
  );
};

export default TeamStats;
