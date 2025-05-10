import React, { Suspense } from "react";
import { LeagueSubscribeTable } from "./leagues-table";
import { subscribeColumns } from "./subscribe-columns";
import { getOpenTournaments } from "@/actions/php-actions";
import Loading from "@/app/home/loading";

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
