import { TopGoals } from "@/components/teams/overview/top-goals";
import { TopPassers } from "@/components/teams/overview/top-passers";
import { CurrentForm } from "@/components/teams/overview/current-form";
import { PreviousMatch } from "@/components/teams/overview/previous-match";
import { UpcomingMatch } from "@/components/teams/overview/upcoming-match";
import { RecentPayments } from "@/components/teams/overview/recent-payments";
import { SeasonSnapshot } from "@/components/teams/overview/season-snapshot";
// import { getUserTeams } from "@/actions/php-actions";
import { getTeamOverview } from "@/actions/django-actions";

const TeamsPage = async () => {
  const teams = await getTeamOverview();
  console.log(teams);
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
