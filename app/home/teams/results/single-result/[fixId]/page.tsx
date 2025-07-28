import SingleResult from "@/app/(home)/teams/components/teams/results/single-result";
import { getFixtureStats } from "@/data/stats/team-stats";

type RProps = {
  params: Promise<{ fixId: string }>;
};

const SingleResultPage = async ({ params }: RProps) => {
  const { fixId } = await params;

  const teamData = await getFixtureStats(fixId);

  console.log(teamData);

  return <SingleResult fixId={fixId} />;
};

export default SingleResultPage;
