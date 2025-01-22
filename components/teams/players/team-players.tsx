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

  const { store, updateTournament, updateSerie } = useStore((state) => state);

  const {
    data: tournamentsData,
    isError: tournamentsError,
    isLoading: tournamentsLoading,
  } = useQuery({
    queryKey: ["teamTournaments", store.team.id],
    queryFn: () => getTeamTournaments(store.team.id),
  });

  const {
    data: playersData,
    isError: playersError,
    isLoading: playersLoading,
  } = useQuery({
    queryKey: ["teamPlayers", store.tournament, store.serie, store.team.id],
    queryFn: () => getTeamPlayers(store.tournament, store.serie, store.team.id),
    enabled: Boolean(store.tournament && store.serie),
  });

  useEffect(() => {
    if (tournamentsData) {
      setSeries(tournamentsData[0].season);
      updateSerie(tournamentsData[0].season[0]?.id);
      updateTournament(tournamentsData[0].tournamentid);
    }
  }, [tournamentsData, updateSerie, updateTournament]);

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
  if (!store.tournament || !store.serie) {
    return <div>Please select a league and season to view players.</div>;
  }
  // console.log(playersData);
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
