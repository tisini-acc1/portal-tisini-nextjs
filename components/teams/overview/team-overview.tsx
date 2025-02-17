"use client";

import React, { useEffect } from "react";
import { PreviousMatch } from "./previous-match";
import { CurrentForm } from "./current-form";
import { SeasonSnapshot } from "./season-snapshot";
import { UpcomingMatch } from "./upcoming-match";
// import Loading from "@/app/home/loading";
// import { getTeamOverview } from "@/actions/django-actions";
// import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/lib/store";

const TeamOverview = ({ overviewData }: { overviewData: TeamOverview[] }) => {
  const { store, updateOverview } = useStore((state) => state);
  const teamId = store.team.id;
  const overview = store.overview;

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["teamOverview"],
  //   queryFn: () => getTeamOverview(),
  // });

  useEffect(() => {
    if (overviewData) {
      if (teamId) {
        const tData = overviewData.filter(
          (item) => item.team_id === store.team.id
        );
        updateOverview(tData[0]);
      }
    }
  }, [teamId, overviewData]);

  // useEffect(() => {
  //   if (data) {
  //     if (teamId) {
  //       const tData = data.filter((item) => item.team_id === store.team.id);
  //       updateOverview(tData[0]);
  //     }
  //   }
  // }, [teamId, data]);

  // if (isLoading) {
  //   return <Loading />;
  // }

  // if (isError) {
  //   return <div>Error</div>;
  // }

  // console.log(data);
  // console.log(overview);
  // console.log(store.team.id);

  return (
    <main className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <PreviousMatch fixture={overview?.last_5_fixtures?.[0] || {}} />
        <CurrentForm recentForm={overview?.recent_form || {}} />
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

export default TeamOverview;
