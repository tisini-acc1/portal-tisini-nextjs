import { getTeamOverview } from "@/actions/django-actions";
import TeamOverview from "@/components/teams/overview/team-overview";

const TeamsPage = async () => {
  const data = await getTeamOverview();

  console.log("overview: ", data);

  return <TeamOverview />;
};

export default TeamsPage;
