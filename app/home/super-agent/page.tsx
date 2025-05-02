import { FixturesTable } from "./fixtures-table";
import { reviewColumns } from "./review-data/review-columns";
import { getSuperAgentFixtures } from "@/actions/php-actions";

const TisiniAdminPage = async () => {
  const data: Promise<AgentFixture[]> = getSuperAgentFixtures();
  const fixtures = await data;

  return (
    <main>
      <FixturesTable data={fixtures} columns={reviewColumns} />
    </main>
  );
};

export default TisiniAdminPage;
