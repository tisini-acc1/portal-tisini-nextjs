"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { columns } from "./columns";
import { useStore } from "@/store/store";
import { FixturesTable } from "./fixtures-table";
import CreateFixtureModal from "@/components/fixtures/create-fixture-modal";
import {
  getMatchPlayStatus,
  getOfficials,
  getTournaments,
  getTournFixtures,
} from "@/actions/php-actions";

const FixturesPage = () => {
  // const data = await fixtureService.getFixtures();

  // const fixtures = data.filter((fixture) => fixture.series === "14").reverse();
  const [fixtures, setFixtures] = useState<AgentFixture[]>([]);
  const [tournament, setTournament] = useState<Competition>({} as Competition);
  // const [round, setRound] = useState("");
  // const [matchdays, setMatchdays] = useState<string[]>([]);

  const { store, updateOfficials, updateMatchStatus } = useStore(
    (state) => state
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["fixtures", store.serie],
    queryFn: () => getTournFixtures(parseInt(store.serie)),
  });

  const { data: tournaments } = useQuery({
    queryKey: ["tournaments"],
    queryFn: () => getTournaments(),
  });

  const { data: status } = useQuery({
    queryKey: ["matchplaystatus"],
    queryFn: () => getMatchPlayStatus(),
  });

  const { data: officials } = useQuery({
    queryKey: ["tournamentOfficials"],
    queryFn: () => getOfficials(),
  });

  useEffect(() => {
    if (data) {
      const fix = data.filter((item) => item.league === store.tournament);

      setFixtures(fix);
    }
  }, [store.tournament, data]);

  useEffect(() => {
    if (officials) {
      updateOfficials(officials);
    }

    if (status) {
      updateMatchStatus(status);
    }
  }, [officials, status, updateMatchStatus, updateOfficials]);

  useEffect(() => {
    if (tournaments) {
      const tourna = tournaments.filter(
        (tournament) => tournament.tournament_id === store.tournament
      );

      setTournament(tourna[0]);
    }
  }, [tournaments, store.tournament]);

  if (isLoading || !officials || !status || !tournaments) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  const abandoned = fixtures.filter(
    (fix) => fix.matchplay_status === "1"
  ).length;
  const played = fixtures.filter((fix) => fix.matchplay_status === "2").length;
  const postponed = fixtures.filter(
    (fix) => fix.matchplay_status === "3"
  ).length;
  const doubleBook = fixtures.filter(
    (fix) => fix.matchplay_status === "4"
  ).length;
  const notPlayed = fixtures.filter(
    (fix) => fix.matchplay_status === "5"
  ).length;
  const forfeit = fixtures.filter((fix) => fix.matchplay_status === "6").length;
  const appealed = fixtures.filter(
    (fix) => fix.matchplay_status === "7"
  ).length;

  // Status labels with optional colors
  const statusLabels = [
    {
      id: "played",
      label: "Played",
      count: played,
      color: "bg-green-500",
    },
    {
      id: "notPlayed",
      label: "Not Played",
      count: notPlayed,
      color: "bg-gray-400",
    },
    {
      id: "postponed",
      label: "Postponed",
      count: postponed,
      color: "bg-yellow-500",
    },
    {
      id: "abandoned",
      label: "Abandoned",
      count: abandoned,
      color: "bg-orange-500",
    },
    {
      id: "forfeit",
      label: "Forfeit",
      count: forfeit,
      color: "bg-red-500",
    },
    {
      id: "appealed",
      label: "Appealed",
      count: appealed,
      color: "bg-blue-500",
    },
    {
      id: "doubleBook",
      label: "Double Booked",
      count: doubleBook,
      color: "bg-purple-500",
    },
    {
      id: "total",
      label: "Total",
      count: fixtures.length,
      color: "bg-indigo-600",
    },
  ];

  // console.log(roundFixtures);
  console.log(fixtures);

  return (
    <main>
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-secondary shadow-sm rounded-lg">
        <div className="w-full md:w-auto">
          {/* <h2 className="text-lg font-semibold mb-2">Match Status Summary</h2> */}
          <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-2">
            {statusLabels.map((status) => (
              <div
                key={status.id}
                className={`flex flex-col items-center p-2 ${status.color} rounded-md`}
              >
                <span className="text-xs font-medium text-gray-700">
                  {status.label}
                </span>
                <span className="text-sm font-bold">{status.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-auto flex justify-end">
          <CreateFixtureModal tournament={tournament} />
        </div>
      </header>

      <FixturesTable columns={columns} data={fixtures} />
    </main>
  );
};

export default FixturesPage;
