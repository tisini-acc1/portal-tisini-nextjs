import { getMyTeams } from "@/lib/fetch-data/teams";
import TeamsNavigation from "../components/teams-navigation";
import SelectTeam from "../components/select-team";

const PlayersPage = async () => {
  const teamsData: Promise<Team[]> = getMyTeams();
  const teams = await teamsData;

  const teamId = teams.length === 1 && teams[0].id;

  if (teams.length === 0) {
    return <div>No players to view, create team first!</div>;
  }

  return (
    <>
      {teams.length === 1 ? (
        <TeamsNavigation teamId={teamId as string} />
      ) : (
        <SelectTeam path="/home/team/teams/players" />
      )}
    </>
  );
};

export default PlayersPage;
