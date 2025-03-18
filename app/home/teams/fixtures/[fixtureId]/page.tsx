import Lineups from "@/components/teams/fixtures/line-ups";

type LineupProps = {
  params: Promise<{ fixtureId: string }>;
};

const PopulateLineupPage = async ({ params }: LineupProps) => {
  const { fixtureId } = await params;

  const fixId = fixtureId.split("-");

  // console.log(fixType);

  return <Lineups type={fixId[1]} fixId={fixId[0]} />;
};

export default PopulateLineupPage;
