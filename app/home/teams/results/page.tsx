"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/lib/store";
import { getTeamTournaments } from "@/actions/php-actions";
import TeamResults from "@/components/teams/results/team-results";
import ResultsHeader from "@/components/teams/results/results-header";

const ResultsPage = () => {
  const [series, setSeries] = useState<TeamSeason[]>([]);
  const [fixtures, setFixtures] = useState<TeamFixture[]>([]);

  const { store, updateTournament, updateSerie, updateFixture } = useStore(
    (state) => state
  );

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["teamTournaments", store.team.id],
    queryFn: () => getTeamTournaments(store.team.id),
  });

  useEffect(() => {
    if (data && data[0] && data[0].season && data[0].season.length > 0) {
      setSeries(data[0].season);
      updateSerie(data[0].season[0]?.id);
      updateTournament(data[0].tournamentid);
    }
  }, [data, updateSerie, updateTournament]);

  useEffect(() => {
    if (data && store.tournament && store.serie) {
      const tournament = data.find(
        (tournament) => tournament.tournamentid === store.tournament
      );

      if (tournament && tournament.season && tournament.season.length > 0) {
        const season = tournament.season.find(
          (season) => season.id === store.serie
        );

        if (season && season.fixture && season.fixture.length > 0) {
          const reversedFixtures = [...season.fixture].reverse();
          setFixtures(reversedFixtures);
          updateFixture(reversedFixtures[0].id);
        }
      }
    }
  }, [data, store.tournament, store.serie]);

  // console.log(data);
  // console.log(store.fixture);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log("resultsError: ", error);
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
        <TeamResults />
      </section>
    </main>
  );
};

export default ResultsPage;
