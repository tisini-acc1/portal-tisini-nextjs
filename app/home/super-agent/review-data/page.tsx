import React, { Suspense } from "react";

import Loading from "../../loading";
import { reviewColumns } from "./review-columns";
import { FixturesTable } from "../fixtures-table";
import { getSuperAgentFixtures } from "@/data/fixtures/get-super-agent-fixtures";

const ReviewDataPage = async () => {
  const data: Promise<AgentFixture[]> = getSuperAgentFixtures();
  const fixtures = await data;

  return (
    <main>
      <Suspense fallback={<Loading />}>
        <FixturesTable data={fixtures} columns={reviewColumns} />
      </Suspense>
    </main>
  );
};

export default ReviewDataPage;
