"use client";

import RugbyPlayerStats from "./rugby-player";
import BasketballPlayerStats from "./basketball-player";
import FootballPlayerStats from "./football-player-stats";
import { useTeamStore } from "@/store/team.store";

type PlayerProps = {
  tData: FixtureData;
  pData: TeamPlayerData;
};

const PlayerStats = ({ tData, pData }: PlayerProps) => {
  const team = useTeamStore((state) => state.store.userTeam);

  const teamId = tData?.fixture[0].team1_id === team.team_id ? "home" : "away";
  const fixType = tData && tData["fixture"][0].fixture_type;

  // console.log(fixType);

  return (
    <div>
      {/* Content according to fixture type */}
      {fixType === "football" ? (
        <FootballPlayerStats team={teamId} data={pData} />
      ) : fixType === "basketball" ? (
        <BasketballPlayerStats team={teamId} data={pData} />
      ) : (
        <RugbyPlayerStats team={teamId} data={pData} fixType={fixType} />
      )}
    </div>
  );
};

export default PlayerStats;
