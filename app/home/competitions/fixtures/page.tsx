import fixtureService from "@/services/fixture.service";
import { FixturesTable } from "./fixtures-table";
import { columns } from "./columns";
import CreateFixtureModal from "@/components/fixtures/create-fixture-modal";

const FixturesPage = async () => {
  const data = await fixtureService.getFixtures();

  const fixtures = data.filter((fixture) => fixture.series === "14").reverse();
  console.log(fixtures[0]);

  return (
    <main>
      <div className="flex justify-end">
        <CreateFixtureModal />
      </div>

      <FixturesTable columns={columns} data={fixtures} />
    </main>
  );
};

export default FixturesPage;
