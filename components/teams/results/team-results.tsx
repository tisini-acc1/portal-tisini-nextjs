"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/lib/store";
import PlayerStats from "./player-stats";
import ResultsHeader from "./results-header";
import { getTeamTournaments } from "@/actions/php-actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeamStats from "./team-stats";

const TeamResults = () => {
  const [series, setSeries] = useState<TeamSeason[]>([]);
  const [fixtures, setFixtures] = useState<TeamFixture[]>([]);

  const { user, updateTournament, updateSeries, updateFixture } = useStore(
    (state) => state
  );

  const { data, isError, isLoading } = useQuery({
    queryKey: ["teamTournaments", user.team],
    queryFn: () => getTeamTournaments(user.team),
  });

  useEffect(() => {
    if (data) {
      setSeries(data[0].season);
      updateSeries(data[0].season[0]?.id);
      updateTournament(data[0].tournamentid);
    }
  }, [data, updateSeries, updateTournament]);

  useEffect(() => {
    if (data && user.tournament && user.series) {
      const tournament = data.find(
        (tournament) => tournament.tournamentid === user.tournament
      );

      if (tournament) {
        const season = tournament.season.find(
          (season) => season.id === user.series
        );
        if (season && season.fixture !== fixtures) {
          setFixtures(season.fixture.reverse());
          updateFixture(season.fixture.reverse()[0].id);
        }
      }
    }
  }, [data, fixtures, user.tournament, user.series]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading tournaments</div>;
  }

  return (
    <main className="space-y-4">
      <ResultsHeader
        tournamentsData={data as TeamTournament[]}
        seriesData={series}
        fixtureData={fixtures}
      />

      <section>
        <Tabs defaultValue="team">
          <TabsList>
            <TabsTrigger value="team">Team Stats</TabsTrigger>
            <TabsTrigger value="player">Player Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="team">
            <TeamStats />
          </TabsContent>
          <TabsContent value="player">
            <PlayerStats />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default TeamResults;
