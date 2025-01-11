import { getAllPlayers } from "@/actions/php-actions";
import TeamPlayers from "@/components/teams/players/team-players";

const TeamPlayersPage = async () => {
  const data = await getAllPlayers("1");

  console.log("country:", data);

  return <TeamPlayers />;
};

export default TeamPlayersPage;
