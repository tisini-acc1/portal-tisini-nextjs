"use client";

import { format } from "date-fns";
import { use, useEffect, useState } from "react";

import TeamSelectHeader from "../team-select-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTeamStore } from "@/store/team.store";

type FixProps = { promiseData: Promise<TeamTournament[]> };

const TeamFixtures = ({ promiseData }: FixProps) => {
  const data = use(promiseData);

  const [fixtures, setFixtures] = useState<TeamFixture[]>([]);
  const [fixType, setFixType] = useState<string>("");
  const [tourns, setTourns] = useState<TeamTournament[]>([]);

  const router = useRouter();
  const pathname = usePathname();

  const {
    store,
    updateSerie,
    updateTournament,
    upateUserFixture,
    updateFixType,
  } = useTeamStore((state) => state);

  useEffect(() => {
    if (data && data[0]?.season) {
      const tournaments = data.filter((item) => item.season.length > 0);

      setTourns(tournaments);

      const seriesData = tournaments[0]?.season.slice().reverse();
      updateSerie(seriesData[0]?.id);
      updateTournament(data[0]?.tournamentid);
      setFixtures(data[0]?.season[0]?.fixture?.slice().reverse() || []);
    }
  }, [data]);

  useEffect(() => {
    if (data && store.tournament && store.serie) {
      setFixType(data[0]?.fixture_type as string);
      const tournament = data.find(
        (tournament) => tournament.tournamentid === store.tournament
      );

      if (tournament) {
        const season = tournament.season.find(
          (season) => season.id === store.serie
        );

        if (season && season.fixture) {
          // Compare the fixtures in a shallow way to avoid unnecessary state updates
          const newFixtures = season.fixture.slice().reverse();
          if (JSON.stringify(newFixtures) !== JSON.stringify(fixtures)) {
            setFixtures(newFixtures);
          }
        }

        updateSerie(tournament.season[0].id);
      }
    }
  }, [data, store.tournament, store.serie]);

  // console.log(data);
  // console.log(fixType);

  // Handle loading and error states
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error loading tournaments. Please try again later.</div>;
  // }

  return (
    <>
      {data && data?.length <= 0 ? (
        <div className="h-screen bg-gray-50 flex items-center justify-center">
          No scheduled fixtures available!
        </div>
      ) : (
        <main className="space-y-8">
          <TeamSelectHeader tournamentsData={tourns as TeamTournament[]} />

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

                    <PlusCircle
                      onClick={() => {
                        updateFixType(fixType);
                        upateUserFixture(fixture);
                        router.push(`${pathname}/${fixture.id}`);
                      }}
                      className="w-5 h-5 cursor-pointer hover:text-blue-500 hover:scale-100"
                    />
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

                  <div className="flex justify-between text-xs text-gray-500 whitespace-nowrap">
                    <p
                      className="w-9/12 overflow-hidden text-ellipsis
                "
                    >
                      League
                    </p>{" "}
                    <p className="w-[20%] overflow-hidden text-ellipsis">
                      Matchday
                    </p>
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

export default TeamFixtures;

export const formattedDate = (dateString: string) => {
  return format(new Date(dateString), "MMMM dd, yyyy");
};
