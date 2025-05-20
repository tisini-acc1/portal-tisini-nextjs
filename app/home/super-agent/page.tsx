import { Suspense } from "react";
import { FixturesTable } from "./fixtures-table";
import { reviewColumns } from "./review-data/review-columns";
import { getSuperAgentFixtures } from "@/actions/php-actions";
import Loading from "../loading";

const TisiniAdminPage = async () => {
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

export default TisiniAdminPage;
