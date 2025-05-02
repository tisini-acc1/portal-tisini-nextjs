import AddMatchData from "./add-match-data";
import { getFixRefEvents } from "@/actions/php-actions";

type DataProps = {
  params: Promise<{ fixtureId: string }>;
};

const MatchDataPage = async ({ params }: DataProps) => {
  const { fixtureId } = await params;

  const ids = fixtureId.split("-");

  const data = await getFixRefEvents(ids?.[0]);

  return <AddMatchData sheetData={data} homeId={ids?.[1]} />;
};

export default MatchDataPage;
