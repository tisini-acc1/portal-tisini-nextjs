import { getMyTeams } from "@/lib/fetch-data/teams";
import CreateTeamCard from "./components/create-team-card";
import { PreviousMatch } from "@/components/teams/home/previous-match";
import { SeasonSnapshot } from "@/components/teams/home/season-snapshot";
import { UpcomingMatch } from "@/components/teams/home/upcoming-match";
import { CurrentForm } from "@/components/teams/home/current-form";
import { RecentPayments } from "@/components/teams/home/recent-payments";
import { TopGoals } from "@/components/teams/home/top-goals";
import { TopPassers } from "@/components/teams/home/top-passers";

const HomePage = async () => {
  const teamsData: Promise<Team[]> = getMyTeams();
  const teams = await teamsData;

  if (teams.length === 0) return <CreateTeamCard />;

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

export default HomePage;

{
  /* <p>
        Hi and welcome to Tisini Portal -- Home of stats, and congratulation on
        creating your team.
      </p>

      <p>
        If you&apos;ve teams under your team like for instance a youth team, an
        academy etc please proceed to Admin on the sidebar, then select My
        Teams. Under My Teams, click the add team subsets button to add your
        team.
      </p>

      <p>
        Now that you have created your teams, you can then proceed to register
        your team(s) to leagues and competitons. Under Admin, select
        Competitions and you will be shown available competitions to enter.
        Click enter button on the respective competition and you will be able to
        register your team to it.
      </p>

      <p>What&apos;s remaining is adding players and staff to the team(s).</p>

      <p>
        On the sidebar, click Team then select either Players or Staffs. If you
        have subset teams you will first be prompted to select team before
        seeing the forms.
      </p> */
}
