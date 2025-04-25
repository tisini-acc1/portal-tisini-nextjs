"use client";

import { useQuery } from "@tanstack/react-query";

import Loading from "@/app/home/loading";
import { useStore } from "@/store/store";
import { footballRating } from "@/lib/rating";
import StatsHeader from "./stats/stats-header";
import BallPlayerStats from "./ball-player-stats";
import { getPlayersData } from "@/actions/php-actions";

const SinglePlayerStats = ({ fixId }: { fixId: string }) => {
  const fixture = useStore((state) => state.store.playerFix);

  const fixtureId = fixId.split("-")[1];
  const fixType = fixId.split("-")[0];

  const { data, isLoading } = useQuery({
    queryKey: ["singlePlayerStats", fixtureId],
    queryFn: () => getPlayersData(fixtureId, 1),
  });

  if (isLoading || !data) {
    return <Loading />;
  }

  const playerData =
    data && data?.home.length > 0 ? data?.home[0] : data?.away[0];

  const rating =
    fixture.fixture_type === "football"
      ? footballRating(playerData?.pnameanddata as Stats)
      : "0.0";

  const headerStats = {
    pname: playerData.pname,
    position: "",
    mins: "0",
    rating: rating,
    homeTeam: fixture?.team1_name,
    awayTeam: fixture?.team2_name,
  };

  return (
    <main className="space-y-3">
      <StatsHeader stats={headerStats} />

      {fixType === "football" ? (
        <BallPlayerStats playerData={playerData as PData} />
      ) : (
        <div>Player stats</div>
      )}
    </main>
  );
};

export default SinglePlayerStats;
