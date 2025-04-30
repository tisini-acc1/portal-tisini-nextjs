import {
  EditOnlineFixture,
  getSuperAgentFixtures,
} from "@/actions/php-actions";

import { FixturesTable } from "./fixtures-table";
import { reviewColumns } from "./review-data/review-columns";

const TisiniAdminPage = async () => {
  const data: Promise<AgentFixture[]> = getSuperAgentFixtures();
  const fixtures = await data;

  const online = await EditOnlineFixture();

  console.log(online);

  return (
    <main>
      <FixturesTable data={fixtures} columns={reviewColumns} />
    </main>
  );
};

export default TisiniAdminPage;
