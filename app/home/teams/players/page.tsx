import { getUserTeams } from "@/actions/php-actions";

const TeamPlayersPage = async () => {
  const teams = await getUserTeams();
  console.log(teams);

  return <div>TeamPlayersPage</div>;
};

export default TeamPlayersPage;
