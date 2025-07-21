import { Suspense } from "react";
import { FixturesTable } from "./fixtures-table";
import Loading from "../loading";
import { columns } from "./columns";
import { getSuperAgentFixtures } from "@/data/fixtures/get-super-agent-fixtures";

const TisiniAdminPage = async () => {
  const data: Promise<AgentFixture[]> = getSuperAgentFixtures();
  const fixtures = await data;

  return (
    <main>
      <Suspense fallback={<Loading />}>
        <FixturesTable data={fixtures} columns={columns} />
      </Suspense>
    </main>
  );
};

export default TisiniAdminPage;
