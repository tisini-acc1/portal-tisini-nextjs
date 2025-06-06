import SinglePlayerStats from "@/components/players/single-player-stats";

type FixtureParams = {
  params: Promise<{
    fixtureId: string;
  }>;
};

const SingleFixturePage = async ({ params }: FixtureParams) => {
  const { fixtureId } = await params;

  return <SinglePlayerStats fixId={fixtureId} />;
};

export default SingleFixturePage;
