import React from "react";
import { rugbyRating } from "@/lib/rating";
import { RugbyStatsTable } from "./rugby-stats-table";
import { eventPoint15s, eventPoint7s } from "@/lib/event-points";
import { playerRugbyStats } from "@/lib/rugby-player-stats";
import { playerRugbyStats7s } from "@/lib/rugby-calc/rugby7s";

type StatsProps = {
  data: TeamPlayerData;
  team: string;
  fixType: string;
};

const RugbyPlayerStats = ({ data, team, fixType }: StatsProps) => {
  const playerData = team === "home" ? data.home : data.away;
  const eventPoints = fixType === "rugby7" ? eventPoint7s : eventPoint15s;

  const pData: RugbyPlayerStat[] = [];
  // console.log(data);

  const maxPoints = fixType === "rugby15" ? 50 : 20;

  playerData.forEach((player) => {
    let pEvent = {} as RugbyPlayerStat;

    const events = player.pnameanddata;

    const pStats =
      fixType === "rugby7"
        ? playerRugbyStats7s(events)
        : playerRugbyStats(events);

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

  return <RugbyStatsTable players={sortedData} />;
};

export default RugbyPlayerStats;
