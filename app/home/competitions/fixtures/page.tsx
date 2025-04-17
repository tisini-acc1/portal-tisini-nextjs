"use client";

import { FixturesTable } from "./fixtures-table";
import { columns } from "./columns";
import CreateFixtureModal from "@/components/fixtures/create-fixture-modal";
import { useQuery } from "@tanstack/react-query";
import { getOfficials, getTournFixtures } from "@/actions/php-actions";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";

const FixturesPage = () => {
  // const data = await fixtureService.getFixtures();

  // const fixtures = data.filter((fixture) => fixture.series === "14").reverse();
  const [fixtures, setFixtures] = useState<AgentFixture[]>([]);

  const { store, updateOfficials } = useStore((state) => state);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["fixtures", store.serie],
    queryFn: () => getTournFixtures(parseInt(store.serie)),
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
  }, [officials, updateOfficials]);

  if (isLoading || !officials) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  // console.log(officials);

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
