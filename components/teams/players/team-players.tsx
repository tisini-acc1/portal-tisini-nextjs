"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { columns } from "./columns";
import { useStore } from "@/lib/store";
import TeamSelectHeader from "../team-select-header";
import { TeamPlayersTable } from "./team-players-table";
import { getTeamPlayers, getTeamTournaments } from "@/actions/php-actions";

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
      <TeamSelectHeader
        tournamentsData={tournamentsData as TeamTournament[]}
        seriesData={series}
      />

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
