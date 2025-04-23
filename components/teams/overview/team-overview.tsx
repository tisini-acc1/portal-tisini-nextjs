"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/store/store";
import Loading from "@/app/home/loading";
import { CurrentForm } from "./current-form";
import { UpcomingMatch } from "./upcoming-match";
import { PreviousMatch } from "./previous-match";
import { SeasonSnapshot } from "./season-snapshot";
import { getTeamOverview } from "@/actions/django-actions";

// { overviewData }: { overviewData: TeamOverview[] }
const TeamOverview = () => {
  const [overview, setOverview] = useState<TeamOverview>({} as TeamOverview);

  const teamId = useStore((state) => state.store.team.id);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["teamOverview"],
    queryFn: () => getTeamOverview(),
  });

  useEffect(() => {
    if (data && teamId) {
      const overviewData = data.filter(
        (overview) => overview.team_id === teamId
      );

      setOverview(overviewData[0]);
    }
  }, [data, teamId]);

  if (isLoading || !data) {
    return <Loading />;
  }

  if (isError) {
    console.log("teams: ", error);
    return <div>Error</div>;
  }

  const tournament = overview?.tournaments?.[0];
  const season = tournament?.season?.[0];

  const fixtues = season?.fixtures?.played;
  const previousFix = fixtues && fixtues[fixtues.length - 1];

  // console.log(season);
  // console.log(data);
  // console.log(overview);
  // console.log(teamId);

  return (
    <main className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <PreviousMatch fixture={previousFix || {}} />
        <CurrentForm
          recentForm={season?.recent_form || {}}
          gf={season?.GF}
          ga={season?.GA}
        />
        <SeasonSnapshot data={season?.season_snapshot} />
        <UpcomingMatch fixture={season?.fixtures?.upcoming?.[0]} />
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
