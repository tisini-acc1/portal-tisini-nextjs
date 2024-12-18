"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/lib/store";
import TeamSelectHeader from "../team-select-header";
import { getTeamTournaments } from "@/actions/php-actions";

const TeamResults = () => {
  const [series, setSeries] = useState<TeamSeason[]>([]);

  const { user, updateTournament, updateSeries } = useStore((state) => state);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["teamTournaments", user.team],
    queryFn: () => getTeamTournaments(user.team),
  });

  useEffect(() => {
    if (data) {
      setSeries(data[0].season);
      updateSeries(data[0].season[0]?.id);
      updateTournament(data[0].tournamentid);
    }
  }, [data, updateSeries, updateTournament]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading tournaments</div>;
  }

  return (
    <main>
      <TeamSelectHeader
        tournamentsData={data as TeamTournament[]}
        seriesData={series}
      />

      <section>Team Stats component</section>
    </main>
  );
};

export default TeamResults;
