"use client";

// import { rugbyData } from "@/actions/fix-data";

import RugbyTeamStats from "../team-stats/rugby-team-stats";
import FootballTeamStats from "../team-stats/football-team-stats";
import BasketballTeamStats from "../team-stats/basketball-team-stats";

const TeamStats = ({ data }: { data: FixtureData }) => {
  const fixType = data && data["fixture"][0].fixture_type;

  // const rugby = rugbyData(data as SingleFixtureStats);
  // console.log(fixType);

  return (
    <>
      {fixType === "rugby15" || fixType === "rugby7" ? (
        <RugbyTeamStats data={data as FixtureData} />
      ) : fixType === "football" ? (
        <FootballTeamStats data={data as FixtureData} />
      ) : fixType === "basketball" ? (
        <BasketballTeamStats data={data as FixtureData} />
      ) : (
        <div className="h-[250px] flex items-center justify-center text-2xl">
          No data!
        </div>
      )}
    </>
  );
};

export default TeamStats;
