"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/lib/store";
import TeamSelectHeader from "../team-select-header";
import { getTeamTournaments } from "@/actions/php-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const TeamFixtures = () => {
  const [series, setSeries] = useState<TeamSeason[]>([]);
  const [fixtures, setFixtures] = useState<TeamFixture[]>([]);

  const router = useRouter();

  const { user, updateSeries, updateTournament } = useStore((state) => state);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["teamTournaments", user.team],
    queryFn: () => getTeamTournaments(user.team),
  });

  useEffect(() => {
    if (data) {
      setSeries(data[0].season);
      updateSeries(data[0].season[0]?.id);
      updateTournament(data[0].tournamentid);
      setFixtures(data[0]?.season[0]?.fixture.slice().reverse() || []);
    }
  }, [data]);

  useEffect(() => {
    if (data && user.tournament && user.series) {
      const tournament = data.find(
        (tournament) => tournament.tournamentid === user.tournament
      );

      if (tournament) {
        const season = tournament.season.find(
          (season) => season.id === user.series
        );
        if (season && season.fixture) {
          // Compare the fixtures in a shallow way to avoid unnecessary state updates
          const newFixtures = season.fixture.slice().reverse();
          if (JSON.stringify(newFixtures) !== JSON.stringify(fixtures)) {
            setFixtures(newFixtures);
          }
        }
      }
    }
  }, [data, user.tournament, user.series]);
  console.log(data);
  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading tournaments. Please try again later.</div>;
  }

  return (
    <main className="space-y-8">
      <TeamSelectHeader
        tournamentsData={data as TeamTournament[]}
        seriesData={series}
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

                <PlusCircle
                  onClick={() =>
                    router.push(`/home/teams/fixtures/${fixture.id}`)
                  }
                  className="w-5 h-5 cursor-pointer hover:text-blue-500 hover:scale-100"
                />
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col space-y-4">
              <div className="flex items-center gap-4">
                <p className="text-3xl">Vs</p>
                <div className="font-mono">
                  <p>
                    {user.teamName === fixture.team1_name
                      ? fixture.team2_name
                      : fixture.team1_name}
                  </p>
                  <p>
                    {user.teamName === fixture.team1_name ? "Home" : "Away"}
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
  );
};

export default TeamFixtures;

const formattedDate = (dateString: string) => {
  return format(new Date(dateString), "MMMM dd, yyyy");
};
