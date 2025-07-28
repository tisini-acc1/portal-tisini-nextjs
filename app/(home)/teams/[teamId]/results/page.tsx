import { Suspense } from "react";

import Loading from "@/app/home/loading";
import { getTeamTournaments } from "@/data/teams/team-tournaments";
import TeamResults from "../../components/teams/results/team-results";

type ResultProps = {
  params: Promise<{ teamId: string }>;
};

const ResultsPage = async ({ params }: ResultProps) => {
  const { teamId } = await params;

  const id = teamId.split("-").pop() || "";

  const tournaData = getTeamTournaments(id, "");

  return (
    <Suspense fallback={<Loading />}>
      <TeamResults tournaData={tournaData} />
    </Suspense>
  );
};

export default ResultsPage;
