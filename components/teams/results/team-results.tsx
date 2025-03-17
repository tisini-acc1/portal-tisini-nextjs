"use client";

import { useQueries } from "@tanstack/react-query";

import TeamStats from "./team-stats";
import { useStore } from "@/lib/store";
import PlayerStats from "./player-stats";
import { getFixtureStats, getPlayersData } from "@/actions/php-actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasketballPlayerStats from "./players/basketball-player";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const TeamResults = () => {
  const { store } = useStore((state) => state);
  const { toast } = useToast();

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
    const tError = results[0].error as Error;
    const pError = results[1].error as Error;
    console.log(pError);

    if (tError || pError) {
      toast({
        title: "Error!",
        variant: "destructive",
        description: "The fixture has not been paid for",
      });
      return <div>error...</div>;
    }

    return <div>error...</div>;
  }

  const team =
    fixtureData?.fixture[0].team1_id === store.team.id ? "home" : "away";
  const fixType = fixtureData && fixtureData["fixture"][0].fixture_type;

  console.log(results);

  return (
    <Tabs defaultValue="team">
      <header className="h-32 bg-header rounded-md">
        <div className="h-24 flex items-center text-white font-bold font-mono">
          <div className="w-2/5 flex items-center justify-end">
            <div className="text-xs md:text-2xl text-right">{"team1_name"}</div>
            <div>
              <Image
                src="/homeLogo.png"
                alt="teamName"
                width={90}
                height={90}
                className="object-contain"
              />
            </div>
          </div>
          <div className="w-1/5 flex items-center justify-center font-bold md:text-2xl text-xl">
            VS
          </div>
          <div className="w-2/5 flex items-center justify-start">
            <div>
              <Image
                src="/awayLogo.png"
                alt="teamName"
                width={90}
                height={90}
                className="object-contain"
              />
            </div>
            <div className="text-xs md:text-2xl">team2_name</div>
          </div>
        </div>

        <div className="flex justify-between items-center bg-slate-50 rounded-md">
          <TabsList className="text-sm">
            <TabsTrigger value="details">Team</TabsTrigger>
            <TabsTrigger value="home">Player</TabsTrigger>
          </TabsList>

          <div>filter component</div>
        </div>
      </header>

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
