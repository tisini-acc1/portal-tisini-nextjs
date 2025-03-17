"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/lib/store";
import { getTeamTournaments } from "@/actions/php-actions";
import TeamResults from "@/components/teams/results/team-results";
import ResultsHeader from "@/components/teams/results/results-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { formattedDate } from "@/components/teams/fixtures/team-fixtures";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import FixPaymentModal from "@/components/teams/results/fix-payment-modal";

const ResultsPage = () => {
  const [series, setSeries] = useState<TeamSeason[]>([]);
  const [fixtures, setFixtures] = useState<TeamFixture[]>([]);

  const router = useRouter();

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

  console.log(fixtures);
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

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* <FixturesCalendar fixtures={fixtures} /> */}
        {fixtures.map((fixture) => (
          <Card
            key={fixture.id}
            className={
              fixture.game_status === "FT" || fixture.game_status === "ended"
                ? "text-gray-400"
                : ""
            }
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {formattedDate(fixture.game_date)}

                <p className="overflow-hidden text-elipsis flex">Round 24</p>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col space-y-4">
              <div className="flex items-center gap-4">
                <p className="text-3xl">Vs</p>
                <div className="font-mono">
                  <p>
                    {store.team.name === fixture.team1_name
                      ? fixture.team2_name
                      : fixture.team1_name}
                  </p>
                  <p>
                    {store.team.name === fixture.team1_name ? "Home" : "Away"}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-500 whitespace-nowrap">
                <p
                  className="w-9/12 overflow-hidden text-ellipsis
                "
                >
                  League
                </p>{" "}
                {fixture.pay_status === 0 ? (
                  <FixPaymentModal />
                ) : (
                  <Button
                    size={"sm"}
                    className={"bg-green-600"}
                    onClick={() =>
                      router.push(`/home/teams/results/${fixture.id}`)
                    }
                  >
                    view
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
};

export default ResultsPage;
