import { rugbyRating } from "@/lib/rating";
import { playerRugbyStats } from "@/lib/rugby-player-stats";
import React from "react";
import { RugbyStatsTable } from "./rugby-stats-table";

type StatsProps = {
  data: TeamPlayerData;
  team: string;
};

const RugbyPlayerStats = ({ data, team }: StatsProps) => {
  const playerData = team === "home" ? data.home : data.away;

  const pData: RugbyPlayerStat[] = [];

  playerData.forEach((player) => {
    let pEvent = {} as RugbyPlayerStat;

    const events = player.pnameanddata;

    const pStats = playerRugbyStats(events);

    // console.log(events);

    pEvent = { ...pStats, name: player.pname, rating: rugbyRating(events) };

    pData.push(pEvent);
  });

  const sortedData = pData.sort(
    (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
  );

  // const rat = rugbyRating(playerData[9].pnameanddata);
  // console.log(rat);

  return <RugbyStatsTable players={sortedData} />;
};

export default RugbyPlayerStats;
