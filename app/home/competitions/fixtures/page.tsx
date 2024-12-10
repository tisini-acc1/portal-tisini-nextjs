"use client";

import { FixturesTable } from "./fixtures-table";
import { columns } from "./columns";
import CreateFixtureModal from "@/components/fixtures/create-fixture-modal";
import { useQuery } from "@tanstack/react-query";
import { getTournFixtures } from "@/actions/php-actions";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";

const FixturesPage = () => {
  // const data = await fixtureService.getFixtures();

  // const fixtures = data.filter((fixture) => fixture.series === "14").reverse();
  const [fixtures, setFixtures] = useState<Fixture[]>([]);

  const { user } = useStore((state) => state);

  const { data } = useQuery({
    queryKey: ["fixtures", user.series],
    queryFn: () => getTournFixtures(parseInt(user.series)),
  });

  useEffect(() => {
    if (data) {
      // const fix = data.filter((item) => item.league === user.tournament);
      setFixtures(data);
    }
  }, [data]);

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
