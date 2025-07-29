"use client";

import { use, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import ResultsHeader from "./results-header";
import { Button } from "@/components/ui/button";
import { useTeamStore } from "@/store/team.store";
import FixPaymentModal from "./fix-payment-modal";
import { formattedDate } from "../fixtures/team-fixtures";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ResultProps = {
  tournaData: Promise<TeamTournament[]>;
};

const TeamResults = ({ tournaData }: ResultProps) => {
  const data = use(tournaData);

  const [series, setSeries] = useState<TeamSeason[]>([]);
  const [fixtures, setFixtures] = useState<TeamFixture[]>([]);
  const [fixType, setFixType] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const { store, updateTournament, updateSerie, updateFixture } = useTeamStore(
    (state) => state
  );

  useEffect(() => {
    if (data && data[0] && data[0].season && data[0].season.length > 0) {
      setSeries(data[0].season);
      updateSerie(data[0].season[0]?.id);
      updateTournament(data[0].tournamentid);
      setFixType(data[0].fixture_type);
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

  return (
    <>
      {data && data.length <= 0 ? (
        <div className="flex items-center justify-center bg-gray-50 h-screen text-2xl font-mono p-4">
          <p className="w-1/2 mx-auto">
            Ooops! No fixture results available at this time.
          </p>
        </div>
      ) : (
        <main className="space-y-4">
          <ResultsHeader
            tournamentsData={data as TeamTournament[]}
            seriesData={series}
          />

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* <FixturesCalendar fixtures={fixtures} /> */}
            {fixtures.map((fixture) => (
              <Card
                key={fixture.id}
                className={
                  fixture.game_status === "FT" ||
                  fixture.game_status === "ended"
                    ? "text-gray-400"
                    : ""
                }
              >
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    {formattedDate(fixture.game_date)}

                    <p className="overflow-hidden text-elipsis flex">
                      Round 00
                    </p>
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col space-y-4">
                  <div className="flex items-center gap-4">
                    <p className="text-3xl">Vs</p>
                    <div className="font-mono">
                      <p>
                        {store.userTeam.teamname === fixture.team1_name
                          ? fixture.team2_name
                          : fixture.team1_name}
                      </p>
                      <p>
                        {store.userTeam.teamname === fixture.team1_name
                          ? "Home"
                          : "Away"}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-500 whitespace-nowrap">
                    <p className="w-9/12 overflow-hidden text-ellipsis italic">
                      {store.userTeam.teamname === fixture.team1_name &&
                      fixture.scores.Home > fixture.scores.Away ? (
                        <span className="text-green-700">
                          {`Won ${fixture.scores.Home} - ${fixture.scores.Away}`}
                        </span>
                      ) : store.userTeam.teamname === fixture.team2_name &&
                        fixture.scores.Home < fixture.scores.Away ? (
                        <span className="text-green-700">
                          {`Won ${fixture.scores.Home} - ${fixture.scores.Away}`}
                        </span>
                      ) : store.userTeam.teamname === fixture.team1_name &&
                        fixture.scores.Away > fixture.scores.Home ? (
                        <span className="text-red-700">
                          {`Lost ${fixture.scores.Home} - ${fixture.scores.Away}`}
                        </span>
                      ) : store.userTeam.teamname === fixture.team2_name &&
                        fixture.scores.Home > fixture.scores.Away ? (
                        <span className="text-red-700">
                          {`Lost ${fixture.scores.Home} - ${fixture.scores.Away}`}
                        </span>
                      ) : fixture.scores.Home === fixture.scores.Away ? (
                        `Drew ${fixture.scores.Home} - ${fixture.scores.Away}`
                      ) : (
                        <span>
                          {`${fixture.scores.Home} - ${fixture.scores.Away}`}
                        </span>
                      )}
                    </p>{" "}
                    <Button
                      size={"sm"}
                      variant={"outline"}
                      className="mr-2"
                      onClick={() =>
                        router.push(
                          `${pathname}/match-sheet/${fixture.id}-${fixture.team1_id}`
                        )
                      }
                    >
                      Match Sheet
                    </Button>
                    {fixture.pay_status === 0 ? (
                      <FixPaymentModal fixture={fixture} />
                    ) : (
                      // <DepositModal open={open} setOpen={setOpen} />
                      <Button
                        size={"sm"}
                        className={"bg-green-600"}
                        onClick={() => {
                          updateFixture(fixture.id);
                          router.push(
                            `${pathname}/single-result/${fixType}-${fixture.id}`
                          );
                        }}
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
      )}
    </>
  );
};

export default TeamResults;
