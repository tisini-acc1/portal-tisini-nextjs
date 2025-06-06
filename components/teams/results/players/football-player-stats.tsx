"use client";

import { footballRating } from "@/lib/rating";
import { playerBallStats } from "@/lib/calculations";
import { PlayerStatsTable } from "./player-stats-table";

type StatsProps = {
  data: TeamPlayerData;
  team: string;
};

const FootballPlayerStats = ({ data, team }: StatsProps) => {
  const players = team === "home" ? data.home : data.away;

  const pData: PlayerEvent[] = [];

  players.forEach((player) => {
    let pEvent = {} as PlayerEvent;

    const events = player.pnameanddata;

    const pStats = playerBallStats(events);

    pEvent = {
      ...pStats,
      name: player.pname,
      rating: footballRating(events).toString(),
    };

    pData.push(pEvent);
  });

  const playerData = pData.sort(
    (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
  );

  // console.log(data);
  // console.log(players);

  return <PlayerStatsTable players={playerData} />;
};

export default FootballPlayerStats;
