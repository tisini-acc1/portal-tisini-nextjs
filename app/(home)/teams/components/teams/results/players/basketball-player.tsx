import { playerBasketballStats } from "@/lib/basketball-calc";
import { PlayerStatsTable } from "../stats-table";
import { basketballColumns } from "./backetball-columns";

type StatsProps = {
  data: TeamPlayerData;
  team: string;
};

const BasketballPlayerStats = ({ data, team }: StatsProps) => {
  const players = team === "home" ? data.home : data.away;

  const pData = [] as BasketballPlayerStats[];

  players.forEach((player) => {
    let pEvent = {} as BasketballPlayerStats;

    const events = player.pnameanddata;

    const pStats = playerBasketballStats(events);

    pEvent = {
      ...pStats,
      name: player.pname,
    };

    pData.push(pEvent);
  });

  const playerData = pData.sort((a, b) => b.point - a.point);

  //   console.log(players);
  //   console.log(pData);

  return <PlayerStatsTable data={playerData} columns={basketballColumns} />;
};

export default BasketballPlayerStats;
