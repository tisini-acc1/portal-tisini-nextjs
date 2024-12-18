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

const TeamFixtures = () => {
  const [series, setSeries] = useState<TeamSeason[]>([]);
  const [fixtures, setFixtures] = useState<TeamFixture[]>([]);
  const [seasonId, setSeasonId] = useState<string | null>(null);
  const [tournamentId, setTournamentId] = useState<string | null>(null);

  const { user } = useStore((state) => state);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["teamTournaments", user.team],
    queryFn: () => getTeamTournaments(user.team),
  });

  useEffect(() => {
    if (data) {
      setSeries(data[0].season);
      setSeasonId(data[0].season[0]?.id || null); // Set the default selected season
      setFixtures(data[0]?.season[0]?.fixture.reverse() || []); // Set default fixtures for the first season
    }
  }, [data]);

  useEffect(() => {
    if (seasonId && data) {
      const selectedSeason = data[0].season.find(
        (season) => season.id === seasonId
      );
      if (selectedSeason) {
        setFixtures(selectedSeason.fixture.reverse());
      }
    }
  }, [seasonId, data]);

  useEffect(() => {
    if (tournamentId && data) {
      const selectedTournament = data.find(
        (tournament) => tournament.tournamentid === tournamentId
      );
      if (selectedTournament) {
        setSeries(selectedTournament.season);
        setSeasonId(selectedTournament.season[0]?.id || null); // Set default season for the selected tournament
        setFixtures(selectedTournament.season[0]?.fixture.reverse() || []);
      }
    }
  }, [tournamentId, data]);

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading tournaments. Please try again later.</div>;
  }

  return (
    <main className="space-y-8">
      <header className="flex gap-4">
        <Select value={tournamentId || ""} onValueChange={setTournamentId}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select league" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Leagues</SelectLabel>
              {data?.map((tournament) => (
                <SelectItem
                  key={tournament.tournamentid}
                  value={tournament.tournamentid}
                >
                  {tournament.tournamentname}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={seasonId || ""} onValueChange={setSeasonId}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select season" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Seasons</SelectLabel>
              {series.map((serie) => (
                <SelectItem key={serie.id} value={serie.id}>
                  {serie.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </header>

      <section>
        <FixturesCalendar fixtures={fixtures} />
      </section>
    </main>
  );
};

export default TeamFixtures;
