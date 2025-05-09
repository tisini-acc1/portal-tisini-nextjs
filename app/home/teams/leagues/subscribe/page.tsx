import React from "react";
import { LeagueSubscribeTable } from "./leagues-table";
import { subscribeColumns } from "./subscribe-columns";

type Tourn = {
  tournamentname: string;
  tournamentid: string;
  status: string;
  fixture_type: string;
  date_from: null | string;
  date_to: null | string;
};

const tournaments: Tourn[] = [
  {
    tournamentname: "FKF Cup",
    tournamentid: "32",
    status: "1",
    fixture_type: "football",
    date_from: null,
    date_to: null,
  },
  {
    tournamentname: "FKF Premier League",
    tournamentid: "205",
    status: "1",
    fixture_type: "football",
    date_from: null,
    date_to: null,
  },
];

const SubscribetoLeaguePage = () => {
  return (
    <main>
      <LeagueSubscribeTable data={tournaments} columns={subscribeColumns} />
    </main>
  );
};

export default SubscribetoLeaguePage;
