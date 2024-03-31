import { getMyTeams } from "@/lib/fetch-data/teams";
import TeamStaffs from "@/components/teams/staffs/team-staffs";

const StaffsPage = async () => {
  const teamsData: Promise<Team[]> = getMyTeams();
  const teams = await teamsData;

  return <TeamStaffs teams={teams} />;
};

export default StaffsPage;
