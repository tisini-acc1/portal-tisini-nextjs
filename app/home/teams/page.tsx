"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import Loading from "../loading";
import { useStore } from "@/lib/store";
import { getTeamOverview } from "@/actions/django-actions";
// import { TopGoals } from "@/components/teams/overview/top-goals";
// import { TopPassers } from "@/components/teams/overview/top-passers";
import { CurrentForm } from "@/components/teams/overview/current-form";
import { PreviousMatch } from "@/components/teams/overview/previous-match";
import { UpcomingMatch } from "@/components/teams/overview/upcoming-match";
// import { RecentPayments } from "@/components/teams/overview/recent-payments";
import { SeasonSnapshot } from "@/components/teams/overview/season-snapshot";
// import { getUserTeams } from "@/actions/php-actions";

const TeamsPage = () => {
  const { store, updateOverview } = useStore((state) => state);
  const teamId = store.team.id;
  const overview = store.overview;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["teamOverview"],
    queryFn: () => getTeamOverview(),
  });

  useEffect(() => {
    if (data) {
      if (teamId) {
        const tData = data.filter((item) => item.team_id === store.team.id);
        updateOverview(tData[0]);
      }
    }
  }, [teamId, data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  // console.log(data);
  console.log(overview);
  // console.log(store.team.id);
  return (
    <main className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <PreviousMatch fixture={overview?.last_5_fixtures?.[0]} />
        <CurrentForm recentForm={overview?.recent_form} />
        <SeasonSnapshot />
        <UpcomingMatch fixture={overview?.upcoming_fixtures?.[0]} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* <RecentPayments />
        <TopGoals />
        <TopPassers /> */}
      </div>
    </main>
  );
};

export default TeamsPage;
