// import { getSession, getUserId } from "@/actions/actions";
// import { getPlayerFixtures, getUser } from "@/actions/fetch-php";
import { PlayerFixtures } from "@/actions/php-actions";
import FixtureCard from "@/components/players/fixture-card";

const PlayersPage = async () => {
  const data: Promise<PlayerFixture[]> = PlayerFixtures(6857);
  const fData = await data;

  const fixtures = fData?.slice().reverse();
  // const data = await getUser();

  // const pData = await getTeamTournaments("", "6857");

  // console.log(pData);

  return (
    <main>
      <section className="gap-4 lg:grid-cols-2 hidden">
        {fixtures?.map((fixture) => (
          <div key={fixture.id}>
            <FixtureCard fixture={fixture} />
          </div>
        ))}
      </section>

      <h1 className="h-96 flex items-center justify-center">
        Player Data Comming Soon
      </h1>
    </main>
  );
};

export default PlayersPage;
