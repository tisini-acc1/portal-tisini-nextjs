"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTeamStore } from "@/store/team.store";
import { getUserTeams } from "@/data/teams/user-teams";

export function useTeamData() {
  const { teams, userTeam } = useTeamStore((state) => state.store);
  const { setTeams, setUserTeam } = useTeamStore();

  const query = useQuery<Team[]>({
    queryKey: ["userTeams"],
    queryFn: getUserTeams,
    staleTime: 1000 * 60,
  });

  // Update store when data changes
  useEffect(() => {
    if (query.data) {
      setTeams(query.data);

      // Find either the currently selected team or default to first team
      const selectedTeam =
        query.data.find((t) => t.team_id === userTeam?.team_id) ||
        query.data[0];

      if (selectedTeam) {
        setUserTeam(selectedTeam);
      }
    }
  }, [query.data, setTeams, setUserTeam, userTeam?.team_id]); // More precise dependency

  return {
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    teams: query.data || teams, // Fallback to store teams if query.data is undefined
  };
}
