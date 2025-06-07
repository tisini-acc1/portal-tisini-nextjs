import React, { Suspense } from "react";
import Loading from "../../../loading";
import { FixturesTable } from "../../fixtures-table";
import { getSuperAgentFixtures } from "@/actions/php-actions";
import { columns } from "../../columns";

const CleanDataPage = async () => {
  const data: Promise<AgentFixture[]> = getSuperAgentFixtures();
  const fixtures = await data;

  return (
    <main>
      Clean Data
      {/* <Suspense fallback={<Loading />}>
        <FixturesTable data={fixtures} columns={columns} />
      </Suspense> */}
    </main>
  );
};

export default CleanDataPage;
