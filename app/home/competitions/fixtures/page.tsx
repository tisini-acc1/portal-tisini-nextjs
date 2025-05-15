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

      setFixtures(fix.reverse());
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

  // const roundFixtures = fixtures.filter(
  //   (fixture) => fixture.matchday === round
  // );

  // console.log(roundFixtures);
  // console.log(fixtures);
  // console.log(store.matchStatus);
  // console.log(tournaments);
  // console.log(store.tournament);

  return (
    <main>
      <div className="flex justify-end">
        <CreateFixtureModal tournament={tournament} />
      </div>

      <FixturesTable columns={columns} data={fixtures} />
    </main>
  );
};

export default FixturesPage;
