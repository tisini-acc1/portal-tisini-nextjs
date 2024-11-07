import { CurrentForm } from "@/components/teams/home/current-form";
import { PreviousMatch } from "@/components/teams/home/previous-match";
import { RecentPayments } from "@/components/teams/home/recent-payments";
import { SeasonSnapshot } from "@/components/teams/home/season-snapshot";
import { TopGoals } from "@/components/teams/home/top-goals";
import { TopPassers } from "@/components/teams/home/top-passers";
import { UpcomingMatch } from "@/components/teams/home/upcoming-match";
import React from "react";

const TeamsPage = () => {
  return (
    <main className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <PreviousMatch />
        <CurrentForm />
        <SeasonSnapshot />
        <UpcomingMatch />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <RecentPayments />
        <TopGoals />
        <TopPassers />
      </div>
    </main>
  );
};

export default TeamsPage;
