import ParentTeams from "@/lib/parent-teams";
import { getMyTeams } from "@/lib/fetch-data/teams";
import TeamPlayers from "../../components/players/team-players";

const PlayersPage = async () => {
  const teamsData: Promise<Team[]> = getMyTeams();
  const teams = await teamsData;
  const parentTeams = ParentTeams(teams);

  return <TeamPlayers teams={parentTeams} />;
};

export default PlayersPage;
