"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { columns } from "./columns";
import { useStore } from "@/store/store";
import { FixturesTable } from "./fixtures-table";
import {
  getMatchPlayStatus,
  getOfficials,
  getTournFixtures,
} from "@/actions/php-actions";
import CreateFixtureModal from "@/components/fixtures/create-fixture-modal";

const FixturesPage = () => {
  // const data = await fixtureService.getFixtures();

  // const fixtures = data.filter((fixture) => fixture.series === "14").reverse();
  const [fixtures, setFixtures] = useState<AgentFixture[]>([]);

  const { store, updateOfficials, updateMatchStatus } = useStore(
    (state) => state
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["fixtures", store.serie],
    queryFn: () => getTournFixtures(parseInt(store.serie)),
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

  if (isLoading || !officials || !status) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  // console.log(fixtures);
  // console.log(store.matchStatus);

  return (
    <main>
      <div className="flex justify-end">
        <CreateFixtureModal />
      </div>

      <FixturesTable columns={columns} data={fixtures} />
    </main>
  );
};

export default FixturesPage;
