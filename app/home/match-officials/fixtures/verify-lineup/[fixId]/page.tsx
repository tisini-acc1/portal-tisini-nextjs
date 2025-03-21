import RefFixHeader from "@/components/match-officials/fixtures/ref-fix-header";
import VerifyPlayerCard from "@/components/match-officials/verify-lineup/verify-player-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VerifyLineupPage = () => {
  return (
    <main>
      <Tabs defaultValue="home">
        <header className="h-32 bg-header rounded-md">
          <RefFixHeader />

          <TabsList className="w-full text-sm">
            <TabsTrigger value="home">Home Lineup</TabsTrigger>
            <TabsTrigger value="away">Away Lineup</TabsTrigger>
          </TabsList>
        </header>

        <TabsContent value={"home"}>
          Home
          {/* <Lineups data={hData} /> */}
        </TabsContent>

        <TabsContent value="away">
          Away
          {/* <Lineups data={aData} /> */}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          {data.map((player) => (
            <VerifyPlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VerifyLineupPage;
