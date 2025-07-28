"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { columns } from "./columns";
import { useStore } from "@/store/store";
import { TeamPlayersTable } from "./team-players-table";
import TeamSelectHeader from "@/app/(home)/teams/components/teams/team-select-header";
import { getTeamPlayers, getTeamTournaments } from "@/actions/php-actions";
import Loading from "@/app/home/loading";
import { useTeamStore } from "@/store/team.store";

const ActivePlayersPage = () => {
  const { store, updateTournament, updateSerie } = useTeamStore(
    (state) => state
  );

  const teamId = store.userTeam.team_id;

  const {
    data: tournamentsData,
    isError: tournamentsError,
    isLoading: tournamentsLoading,
  } = useQuery({
    queryKey: ["teamTournaments", teamId],
    queryFn: () => getTeamTournaments(teamId, ""),
  });

  const {
    data: playersData,
    isError: playersError,
    isLoading: playersLoading,
  } = useQuery({
    queryKey: ["teamPlayers", store.tournament, store.serie, teamId],
    queryFn: () => getTeamPlayers(store.tournament, store.serie, teamId),
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
