"use client";

import { getTeamPlayers, getTeamTournaments } from "@/actions/php-actions";
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
import { useEffect, useState } from "react";
import { TeamPlayersTable } from "./team-players-table";
import { columns } from "./columns";
import { format } from "date-fns";

const TeamPlayers = () => {
  const [series, setSeries] = useState<TeamSeason[]>([]);

  const { user, updateTournament, updateSeries } = useStore((state) => state);

  const {
    data: tournamentsData,
    isError: tournamentsError,
    isLoading: tournamentsLoading,
  } = useQuery({
    queryKey: ["teamTournaments", user.team],
    queryFn: () => getTeamTournaments(user.team),
  });

  const {
    data: playersData,
    isError: playersError,
    isLoading: playersLoading,
  } = useQuery({
    queryKey: ["teamPlayers", user.tournament, user.series, user.team],
    queryFn: () => getTeamPlayers(user.tournament, user.series, user.team),
    enabled: Boolean(user.tournament && user.series), // Only fetch players when a tournament and series are selected
  });

  useEffect(() => {
    if (tournamentsData) {
      setSeries(tournamentsData[0].season);
      updateSeries(tournamentsData[0].season[0]?.id);
      updateTournament(tournamentsData[0].tournamentid);
    }
  }, [tournamentsData, updateSeries, updateTournament]);

  // Handle loading and error states for tournaments
  if (tournamentsLoading) {
    return <div>Loading tournaments...</div>;
  }

  if (tournamentsError) {
    return <div>Error loading tournaments. Please try again later.</div>;
  }

  // Handle loading and error states for players
  if (playersLoading) {
    return <div>Loading players...</div>;
  }

  if (playersError) {
    return <div>Error loading players. Please try again later.</div>;
  }

  // Ensure there's a tournament and series selected before rendering the table
  if (!user.tournament || !user.series) {
    return <div>Please select a league and season to view players.</div>;
  }

  return (
    <main className="space-y-8">
      <header className="flex gap-4">
        <Select value={user.tournament} onValueChange={updateTournament}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select league" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Leagues</SelectLabel>
              {tournamentsData?.map((tournament) => (
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

        <Select value={user.series} onValueChange={updateSeries}>
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
        <TeamPlayersTable
          data={playersData as TeamPlayer[]}
          columns={columns}
        />
      </section>
    </main>
  );
};

export default TeamPlayers;
