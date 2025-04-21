"use client";

import { useStore } from "@/store/store";
import BasketballPlayerStats from "./basketball-player";
import FootballPlayerStats from "./football-player-stats";

type PlayerProps = {
  tData: FixtureData;
  pData: TeamPlayerData;
};

const PlayerStats = ({ tData, pData }: PlayerProps) => {
  const team = useStore((state) => state.store.team);

  const teamId = tData?.fixture[0].team1_id === team.id ? "home" : "away";
  const fixType = tData && tData["fixture"][0].fixture_type;

  return (
    <div>
      {/* Content according to fixture type */}
      {fixType === "football" ? (
        <FootballPlayerStats team={teamId} data={pData} />
      ) : fixType === "basketball" ? (
        <BasketballPlayerStats team={teamId} data={pData} />
      ) : (
        <div>No Data!</div>
      )}
    </div>
  );
};

export default PlayerStats;
