import { getMyTeams } from "@/lib/fetch-data/teams";
import TeamsNavigation from "../components/teams-navigation";
import SelectTeam from "../components/select-team";

const StaffsPage = async () => {
  const teamsData: Promise<Staff[]> = getMyTeams();
  const teams = await teamsData;

  const teamId = teams.length === 1 && teams[0].id;

  return (
    <>
      {teams.length === 1 ? (
        <TeamsNavigation teamId={teamId as any} />
      ) : (
        <SelectTeam path="/home/team/teams/staffs" />
      )}
    </>
  );
};

export default StaffsPage;
