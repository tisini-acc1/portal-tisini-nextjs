import { getSuperAgentFixtures } from "@/actions/php-actions";

import { FixturesTable } from "../fixtures-table";
import { reviewColumns } from "./review-columns";

const ReviewFixturesPage = async () => {
  const data: Promise<AgentFixture[]> = getSuperAgentFixtures();
  const fixtures = await data;

  return (
    <main>
      <FixturesTable data={fixtures} columns={reviewColumns} />
    </main>
  );
};

export default ReviewFixturesPage;
