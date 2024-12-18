"use client";

import { useEffect, useState } from "react";
import FixturesCalendar from "./fixtures-calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import { getTeamTournaments } from "@/actions/php-actions";
import TeamSelectHeader from "../team-select-header";

const TeamFixtures = () => {
  const [series, setSeries] = useState<TeamSeason[]>([]);
  const [fixtures, setFixtures] = useState<TeamFixture[]>([]);

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
      setFixtures(data[0]?.season[0]?.fixture.reverse() || []);
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
        if (season && season.fixture !== fixtures) {
          setFixtures(season.fixture);
        }
      }
    }
  }, [data, fixtures, user.tournament, user.series]);

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

      <section>
        <FixturesCalendar fixtures={fixtures} />
      </section>
    </main>
  );
};

export default TeamFixtures;
