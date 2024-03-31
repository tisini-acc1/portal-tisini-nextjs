import { getMyTeams } from "@/lib/fetch-data/teams";
import TeamPlayers from "@/components/teams/players/team-players";

const PlayersPage = async () => {
  const teamsData: Promise<Team[]> = getMyTeams();
  const teams = await teamsData;

  return <TeamPlayers teams={teams} />;
};

export default PlayersPage;
