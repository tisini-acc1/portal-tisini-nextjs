import { getTeamTournaments } from "@/actions/php-actions";
import TeamFixtures from "@/components/teams/fixtures/team-fixtures";

const TeamFixturesPage = async () => {
  const data = await getTeamTournaments();

  return <TeamFixtures data={data} />;
};

export default TeamFixturesPage;
