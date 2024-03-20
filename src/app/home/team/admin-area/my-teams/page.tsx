import ParentTeams from "@/lib/parent-teams";
import { getMyTeams } from "@/lib/fetch-data/teams";
import MyTeams from "../../components/myTeams/my-teams";

const MyTeamsPage = async () => {
  const teamsData: Promise<Team[]> = getMyTeams();
  const teams = await teamsData;
  const parentTeams = ParentTeams(teams);

  return <MyTeams teams={parentTeams} />;
};

export default MyTeamsPage;
