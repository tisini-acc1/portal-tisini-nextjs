// import { getTeamOverview } from "@/actions/django-actions";
// import { getMainEvents, getVideoEvents } from "@/actions/php-actions";
import TeamOverview from "@/components/teams/overview/team-overview";

const TeamsPage = async () => {
  // console.time("teams");
  // const data = await getTeamOverview();
  // console.timeEnd("teams");

  // console.log("overview: ", data);
  // const data = await getVideoEvents("7475");

  // console.log(data);

  return <TeamOverview />;
};

export default TeamsPage;
