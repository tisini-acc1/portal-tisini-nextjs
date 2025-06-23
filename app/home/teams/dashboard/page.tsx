"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Loading from "../../loading";
import { useStore } from "@/store/store";
import { getTeamTournaments } from "@/actions/php-actions";
import ResultsHeader from "@/components/teams/results/results-header";
import DashboardData from "./dashboard-data";

const DashboardPage = () => {
  const [series, setSeries] = useState<TeamSeason[]>([]);
  const [fixtures, setFixtures] = useState<TeamFixture[]>([]);

  const { store, updateTournament, updateSerie } = useStore((state) => state);
  // const fixType = store.team.teamType.toLowerCase();

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["teamTournaments", store.team.id],
    queryFn: () => getTeamTournaments(store.team.id, ""),
  });

  // const { data: events } = useQuery({
  //   queryKey: ["fixtureEvents", fixType],
  //   queryFn: () => getEvents(fixType as string),
  // });

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
        }

        setSeries(tournament.season);
        updateSerie(tournament.season[0].id);
      }
    }
  }, [data, store.tournament, store.serie]);

  // console.log(events);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.log(error.message);
    return <div>Error!</div>;
  }

  return (
    <main>
      {data && data.length <= 0 ? (
        <div className="flex items-center justify-center bg-gray-50 h-screen text-2xl font-mono p-4">
          <p className="w-1/2 mx-auto">
            Ooops! No fixture results available at this time.
          </p>
        </div>
      ) : (
        <section>
          {data && data?.length > 1 && (
            <ResultsHeader
              tournamentsData={data as TeamTournament[]}
              seriesData={series}
            />
          )}

          <DashboardData fixtures={fixtures} />
        </section>
      )}
    </main>
  );
};

export default DashboardPage;
