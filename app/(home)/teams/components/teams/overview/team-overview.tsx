"use client";

import React, { use, useEffect, useState } from "react";

import { CurrentForm } from "./current-form";
import { UpcomingMatch } from "./upcoming-match";
import { PreviousMatch } from "./previous-match";
import { SeasonSnapshot } from "./season-snapshot";
import { useTeamStore } from "@/store/team.store";

type OverviewProps = {
  overviewData: Promise<TeamOverview[]>;
};

const TeamOverview = ({ overviewData }: OverviewProps) => {
  const data = use(overviewData);

  const [overview, setOverview] = useState<TeamOverview>({} as TeamOverview);

  const teamId = useTeamStore((state) => state.store.userTeam.team_id);

  useEffect(() => {
    if (data && teamId) {
      const overviewData = data.filter(
        (overview) => overview.team_id === teamId
      );

      setOverview(overviewData[0]);
    }
  }, [data, teamId]);

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
