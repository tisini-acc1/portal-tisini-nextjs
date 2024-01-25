import { getComp } from "@/lib/fetch-data/competitions";
import CompsHeader from "../../components/my-comps/comps-header";

type Props = {
  params: {
    compsId: string;
  };
};

const SingleCompetitionPage = async ({ params: { compsId } }: Props) => {
  const compData: Promise<Competition> = getComp(compsId);
  const competition = await compData;

  return (
    <main>
      <CompsHeader competition={competition} />
    </main>
  );
};

export default SingleCompetitionPage;
