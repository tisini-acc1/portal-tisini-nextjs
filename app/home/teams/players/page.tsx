import { getTeamTournaments } from "@/actions/php-actions";
import TeamPlayers from "@/components/teams/players/team-players";

const TeamPlayersPage = async () => {
  const data = await getTeamTournaments();

  return <TeamPlayers data={data} />;
};

export default TeamPlayersPage;
