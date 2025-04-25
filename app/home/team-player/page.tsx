// import { getSession, getUserId } from "@/actions/actions";
// import { getPlayerFixtures, getUser } from "@/actions/fetch-php";
import { PlayerFixtures } from "@/actions/php-actions";
import FixtureCard from "@/components/players/fixture-card";

const PlayersPage = async () => {
  const data: Promise<PlayerFixture[]> = PlayerFixtures();
  const fData = await data;

  const fixtures = fData?.slice().reverse();
  // const data = await getUser();

  // const data = await PlayerFixtures();

  // console.log(fData);

  return (
    <main>
      <section className="grid gap-4 lg:grid-cols-2">
        {fixtures?.map((fixture) => (
          <div key={fixture.id}>
            <FixtureCard fixture={fixture} />
          </div>
        ))}
      </section>
    </main>
  );
};

export default PlayersPage;
