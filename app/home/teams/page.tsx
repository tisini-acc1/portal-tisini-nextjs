// import { getTeamOverview } from "@/actions/django-actions";
import TeamOverview from "@/components/teams/overview/team-overview";

const TeamsPage = async () => {
  // console.time("teams");
  // const data = await getTeamOverview();
  // console.timeEnd("teams");

  // console.log("overview: ", data);

  return <TeamOverview />;
};

export default TeamsPage;
