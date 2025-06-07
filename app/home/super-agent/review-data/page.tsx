import { getSuperAgentFixtures } from "@/actions/php-actions";

import { FixturesTable } from "../fixtures-table";
import { reviewColumns } from "./review-columns";
import { Suspense } from "react";
import Loading from "../../loading";

const ReviewFixturesPage = async () => {
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

export default ReviewFixturesPage;
