import { getSuperAgentFixtures } from "@/actions/php-actions";

import { columns } from "./columns";
import { FixturesTable } from "./fixtures-table";

const TisiniAdminPage = async () => {
  const data: Promise<AgentFixture[]> = getSuperAgentFixtures();
  const fixtures = await data;

  console.log(fixtures[0]);

  return (
    <main>
      <FixturesTable data={fixtures} columns={columns} />
    </main>
  );
};

export default TisiniAdminPage;
