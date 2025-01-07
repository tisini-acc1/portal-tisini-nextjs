// import { TopGoals } from "@/components/teams/overview/top-goals";
// import { TopPassers } from "@/components/teams/overview/top-passers";
// import { CurrentForm } from "@/components/teams/overview/current-form";
// import { PreviousMatch } from "@/components/teams/overview/previous-match";
// import { UpcomingMatch } from "@/components/teams/overview/upcoming-match";
// import { RecentPayments } from "@/components/teams/overview/recent-payments";
// import { SeasonSnapshot } from "@/components/teams/overview/season-snapshot";
// import { getUserTeams } from "@/actions/php-actions";
// import { getTeamOverview } from "@/actions/django-actions";

const TeamsPage = async () => {
  // const teams = await getTeamOverview();
  // console.log(teams);
  return (
    // <main className="space-y-6">
    //   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    //     <PreviousMatch />
    //     <CurrentForm />
    //     <SeasonSnapshot />
    //     <UpcomingMatch />
    //   </div>

    //   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    //     <RecentPayments />
    //     <TopGoals />
    //     <TopPassers />
    //   </div>
    // </main>
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
};

export default TeamsPage;
