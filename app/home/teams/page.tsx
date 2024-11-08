import { TopGoals } from "@/components/teams/top-goals";
import { TopPassers } from "@/components/teams/top-passers";
import { CurrentForm } from "@/components/teams/current-form";
import { PreviousMatch } from "@/components/teams/previous-match";
import { UpcomingMatch } from "@/components/teams/upcoming-match";
import { RecentPayments } from "@/components/teams/recent-payments";
import { SeasonSnapshot } from "@/components/teams/season-snapshot";

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
