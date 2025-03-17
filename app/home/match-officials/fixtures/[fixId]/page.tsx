import { getOfficialsEvents, getTeamLineup } from "@/actions/php-actions";
import FixtureData from "@/components/match-officials/fixtures/fixture-data";
import RefFixtureDetails from "@/components/match-officials/fixtures/ref-fix-details";
import RefFixHeader from "@/components/match-officials/fixtures/ref-fix-header";
import VerifyPlayerCard from "@/components/match-officials/verify-player-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

type LineupProps = {
  params: Promise<{ fixId: string }>;
};

const LineupPage = async ({ params }: LineupProps) => {
  const { fixId } = await params;

  const fixture = fixId.split("-");

  const hData = await getTeamLineup(fixture[0], fixture[1]);
  const aData = await getTeamLineup(fixture[0], fixture[2]);
  const refEvents = await getOfficialsEvents();

  // console.log(hData);
  // console.log(aData);
  console.log(refEvents);

  return (
    <main>
      <Tabs defaultValue="details">
        <header className="h-32 bg-header rounded-md">
          <RefFixHeader />

          <TabsList className="w-full text-sm">
            <TabsTrigger value="details">Info</TabsTrigger>
            <TabsTrigger value="home">Home Lineup</TabsTrigger>
            <TabsTrigger value="away">Away Lineup</TabsTrigger>
            <TabsTrigger value="data">Match Data</TabsTrigger>
          </TabsList>
        </header>

        <TabsContent value={"details"}>
          <RefFixtureDetails />
        </TabsContent>

        <TabsContent value={"home"}>
          <Lineups data={hData} />
        </TabsContent>

        <TabsContent value="away">
          <Lineups data={aData} />
        </TabsContent>

        <TabsContent value="data">
          <FixtureData />
        </TabsContent>
      </Tabs>
    </main>
  );
};

const Lineups = ({ data }: { data: Lineup[] }) => {
  // const first11 = data?.filter((item) => item.player_type === "first11");
  // const subs = data?.filter((item) => item.player_type === "sub");
  if (data.length === 0) {
    return (
      <section className="h-[450px] bg-gray-100 flex items-center justify-center text-2xl rounded-md">
        No data!
      </section>
    );
  }

  return (
    <section className="space-y-6 bg-gray-100 p-3 rounded-md">
      <div>
        {/* <div className="w-full bg-blue-600 text-white py-2 px-4 rounded-b-lg shadow-lg flex justify-center space-x-2">
          <strong className="text-2xl font-bold">Verified {12}</strong>
          <span className="text-lg">of</span>
          <span className="text-2xl font-bold">{23} players</span>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          {data.map((player) => (
            <VerifyPlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>

      {/* <div>
        <strong className="mb-2">Substitutes</strong>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {subs.map((player) => (
            <VerifyPlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div> */}
    </section>
  );
};

export default LineupPage;
