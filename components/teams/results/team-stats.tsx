"use client";

// import { rugbyData } from "@/actions/fix-data";

import RugbyTeamStats from "../team-stats/rugby-team-stats";
import FootballTeamStats from "../team-stats/football-team-stats";

const TeamStats = ({ data }: { data: FixtureData }) => {
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
