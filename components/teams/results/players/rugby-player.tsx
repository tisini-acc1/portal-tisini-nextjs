import React from "react";
import { rugbyRating } from "@/lib/rating";
import { RugbyStatsTable } from "./rugby-stats-table";
import { playerRugbyStats } from "@/lib/rugby-player-stats";
import { eventPoint15s, eventPoint7s } from "@/lib/event-points";

type StatsProps = {
  data: TeamPlayerData;
  team: string;
  fixType: string;
};

const RugbyPlayerStats = ({ data, team, fixType }: StatsProps) => {
  const playerData = team === "home" ? data.home : data.away;
  const eventPoints = fixType === "rugby7" ? eventPoint7s : eventPoint15s;

  const pData: RugbyPlayerStat[] = [];

  const maxPoints = fixType === "rugby15" ? 50 : 25;

  playerData.forEach((player) => {
    let pEvent = {} as RugbyPlayerStat;

    const events = player.pnameanddata;

    const pStats = playerRugbyStats(events);

    // console.log(events);

    pEvent = {
      ...pStats,
      name: player.pname,
      rating: rugbyRating(events, maxPoints, eventPoints),
    };

    pData.push(pEvent);
  });

  const sortedData = pData.sort(
    (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
  );

  // const rat = rugbyRating(playerData[9].pnameanddata);
  // console.log(data);

  return <RugbyStatsTable players={sortedData} />;
};

export default RugbyPlayerStats;
