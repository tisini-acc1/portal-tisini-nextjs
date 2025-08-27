import { getTeamOverview } from "@/data/overview/overview";
import TeamOverview from "@/app/(home)/teams/components/teams/overview/team-overview";

const TeamsPage = async () => {
  const data = await getTeamOverview();

  return <TeamOverview overviewData={data} />;
};

export default TeamsPage;
