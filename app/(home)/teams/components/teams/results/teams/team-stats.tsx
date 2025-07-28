"use client";

// import { rugbyData } from "@/actions/fix-data";

import RugbyTeamStats from "../../team-stats/rugby-team-stats";
import FootballTeamStats from "../../team-stats/football-team-stats";
import BasketballTeamStats from "../../team-stats/basketball-team-stats";

type TeamProps = {
  data: FixtureData;
  videoData: VideoEvent[];
};

const TeamStats = ({ data, videoData }: TeamProps) => {
  const fixType = data && data["fixture"][0].fixture_type;

  // const rugby = rugbyData(data as SingleFixtureStats);
  // console.log(fixType);

  return (
    <>
      {fixType === "rugby15" || fixType === "rugby7" ? (
        <RugbyTeamStats data={data as FixtureData} fixType={fixType} />
      ) : fixType === "football" ? (
        <FootballTeamStats data={data as FixtureData} videoData={videoData} />
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
