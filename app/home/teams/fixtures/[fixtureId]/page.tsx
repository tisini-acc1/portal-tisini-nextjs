import Lineups from "@/components/teams/fixtures/line-ups";

type LineupProps = {
  params: Promise<{ fixtureId: string }>;
};

const PopulateLineupPage = async ({ params }: LineupProps) => {
  const { fixtureId } = await params;

  const fixType = fixtureId.split("-")[1];

  // console.log(fixType);

  return <Lineups type={fixType} />;
};

export default PopulateLineupPage;
