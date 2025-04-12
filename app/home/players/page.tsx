import { getPlayerFixtures } from "@/actions/fetch-php";
import FixtureCard from "@/components/players/fixture-card";

const PlayersPage = async () => {
  const data: Promise<PlayerFixture[]> = getPlayerFixtures();
  const fData = await data;

  const fixtures = fData.slice().reverse();

  // const playerData = await getPlayersData("6845");

  console.log(fixtures);

  return (
    <main>
      <section className="grid gap-4 lg:grid-cols-2">
        {fixtures.map((fixture) => (
          <div key={fixture.id}>
            <FixtureCard fixture={fixture} />
          </div>
        ))}
      </section>
    </main>
  );
};

export default PlayersPage;
