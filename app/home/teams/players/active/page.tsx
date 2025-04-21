"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { columns } from "./columns";
import { useStore } from "@/lib/store";
import { TeamPlayersTable } from "./team-players-table";
import TeamSelectHeader from "@/components/teams/team-select-header";
import { getTeamPlayers, getTeamTournaments } from "@/actions/php-actions";
import Loading from "@/app/home/loading";

const ActivePlayersPage = () => {
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
    if (
      tournamentsData &&
      tournamentsData.length > 0 &&
      tournamentsData[0]?.season
    ) {
      const seasonData = tournamentsData[0]?.season;
      updateSerie(seasonData[0]?.id);
      updateTournament(tournamentsData[0]?.tournamentid);
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
    return <Loading />;
  }

  if (playersError) {
    return <div>Error loading players. Please try again later.</div>;
  }

  // Ensure there's a tournament and series selected before rendering the table
  if (!store.tournament || !store.serie) {
    return <div>Please select a league and season to view players.</div>;
  }
  // console.log(tournamentsData);
  return (
    <main className="space-y-3">
      {tournamentsData && tournamentsData?.length > 0 && (
        <TeamSelectHeader
          tournamentsData={tournamentsData as TeamTournament[]}
        />
      )}

      <section>
        <TeamPlayersTable
          data={playersData as TeamPlayer[]}
          columns={columns}
        />
      </section>
    </main>
  );
};

export default ActivePlayersPage;
