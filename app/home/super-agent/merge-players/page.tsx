import { Suspense } from "react";

import Loading from "../../loading";
import MergePlayers from "./merge-players";
import { getAllTeams } from "@/data/teams/get-teams";

const MergePlayersPage = () => {
  const teamsPromise = getAllTeams();

  return (
    <Suspense fallback={<Loading />}>
      <MergePlayers data={teamsPromise} />
    </Suspense>
  );
};

export default MergePlayersPage;
