"use client";

import { useQueries } from "@tanstack/react-query";

import TeamStats from "./team-stats";
import { useStore } from "@/lib/store";
import PlayerStats from "./player-stats";
import { getFixtureStats, getPlayersData } from "@/actions/php-actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasketballPlayerStats from "./players/basketball-player";

const TeamResults = () => {
  const { store } = useStore((state) => state);

  const results = useQueries({
    queries: [
      {
        queryKey: ["fixStats", store.fixture],
        queryFn: () => getFixtureStats(store.fixture),
      },
      {
        queryKey: ["teamPlayerStats", store.fixture],
        queryFn: () => getPlayersData(store.fixture),
      },
    ],
  });

  const fixtureData = results[0].data;
  const playerData = results[1].data;
  const isFixtureLoading = results[0].isLoading;
  const isPlayerLoading = results[1].isLoading;
  const isFixtureError = results[0].isError;
  const isPlayerError = results[1].isError;

  if (isFixtureLoading || isPlayerLoading) {
    return <div>Loading...</div>;
  }

  if (isFixtureError || isPlayerError) {
    return <div>error...</div>;
  }

  const team =
    fixtureData?.fixture[0].team1_id === store.team.id ? "home" : "away";
  const fixType = fixtureData && fixtureData["fixture"][0].fixture_type;

  // console.log(playerData);

  return (
    <Tabs defaultValue="team">
      <TabsList>
        <TabsTrigger value="team">Team Stats</TabsTrigger>
        <TabsTrigger value="player">Player Stats</TabsTrigger>
      </TabsList>

      <TabsContent value="team">
        <TeamStats data={fixtureData as FixtureData} />
      </TabsContent>

      <TabsContent value="player">
        {/* Content according to fixture type */}
        {fixType === "football" ? (
          <PlayerStats team={team} data={playerData as TeamPlayerData} />
        ) : fixType === "basketball" ? (
          <BasketballPlayerStats
            team={team}
            data={playerData as TeamPlayerData}
          />
        ) : (
          <div>No Data!</div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default TeamResults;
