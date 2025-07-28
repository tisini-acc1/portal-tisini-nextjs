import React, { Suspense } from "react";

import Loading from "@/app/home/loading";
import { LeagueSubscribeTable } from "./leagues-table";
import { subscribeColumns } from "./subscribe-columns";
import { getOpenTournaments } from "@/data/tournaments/open-tournaments";

const SubscribetoLeaguePage = async () => {
  const tournaments = await getOpenTournaments();

  // console.log(tournaments);

  return (
    <main>
      <Suspense fallback={<Loading />}>
        <LeagueSubscribeTable data={tournaments} columns={subscribeColumns} />
      </Suspense>
    </main>
  );
};

export default SubscribetoLeaguePage;
