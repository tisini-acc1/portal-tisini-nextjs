"use client";

import { footballRating } from "@/lib/rating";
import { playerBallStats } from "@/lib/calculations";
import { PlayerStatsTable } from "./stats-table";
import { columns } from "./columns";

type StatsProps = {
  data: TeamPlayerData;
  team: string;
  fixType: string;
};

const PlayerStats = ({ data, team, fixType }: StatsProps) => {
  const players = team === "home" ? data.home : data.away;

  const pData: PlayerEvent[] = [];

  players.forEach((player) => {
    let pEvent = {} as PlayerEvent;

    const events = player.pnameanddata;

    const pStats =
      fixType === "football" ? playerBallStats(events) : ({} as PlayerEvent);

    pEvent = {
      ...pStats,
      name: player.pname,
      rating: footballRating(events).toString(),
    };

    pData.push(pEvent);
  });

  console.log(data);

  return (
    <div className="">
      <PlayerStatsTable columns={columns} data={pData} />
    </div>
  );
};

export default PlayerStats;

// type PlayerEvent = {
//   name: string;
//   rating: string;
//   goal: string;
//   assist: string;
//   chances: string;
//   "box-touch": string;
//   "box-carry": string;
//   shots: string;
//   crosses: string;
//   pass: string;
//   "prog-pass": string;
//   tackles: string;
//   "ball-efficiency": string;
//   interception: string;
//   clearance: string;
//   blocks: string;
//   aerial: string;
//   fouls: string;
//   cards: string;
//   claims: string;
//   distribution: string;
//   runouts: string;
//   throwouts: string;
//   saves: string;
// };
