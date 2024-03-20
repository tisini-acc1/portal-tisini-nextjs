import ParentTeams from "@/lib/parent-teams";
import { getMyTeams } from "@/lib/fetch-data/teams";
import TeamStaffs from "../../components/staffs/team-staffs";

const StaffsPage = async () => {
  const teamsData: Promise<Team[]> = getMyTeams();
  const teams = await teamsData;
  const parentTeams = ParentTeams(teams);

  return <TeamStaffs teams={parentTeams} />;
};

export default StaffsPage;
