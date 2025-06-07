import { Suspense } from "react";
import { FixturesTable } from "./fixtures-table";
import { getSuperAgentFixtures } from "@/actions/php-actions";
import Loading from "../loading";
import { columns } from "./columns";

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
