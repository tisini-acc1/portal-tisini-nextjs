"use client";

import { footballRating } from "@/lib/rating";
import { playerBallStats } from "@/lib/calculations";

type PlayerEvent = {
  name: string;
  rating: string;
  goal: string;
  assist: string;
  chances: string;
  "box-touch": string;
  "box-carry": string;
  shots: string;
  crosses: string;
  pass: string;
  "prog-pass": string;
  tackles: string;
  "ball-efficiency": string;
  interception: string;
  clearance: string;
  blocks: string;
  aerial: string;
  fouls: string;
  cards: string;
  claims: string;
  distribution: string;
  runouts: string;
  throwouts: string;
  saves: string;
};

const PlayerStats = ({ data }: { data: TeamPlayerData }) => {
  const players = data.away;

  const pData: any = [];

  players.forEach((player) => {
    let pEvent = {};

    const events = player.pnameanddata;

    const pStats = playerBallStats(events);

    pEvent = {
      ...pStats,
      name: player.pname,
      rating: footballRating(events).toString(),
    };

    pData.push(pEvent);
  });

  return <div>PlayerStatsstats</div>;
};

export default PlayerStats;
