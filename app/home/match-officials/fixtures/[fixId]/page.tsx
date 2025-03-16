import { getTeamLineup } from "@/actions/php-actions";
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

  console.log(hData);
  console.log(aData);
  return (
    <main>
      <Tabs defaultValue="home">
        <header className="h-32 bg-header rounded-md">
          <div className="h-24 flex items-center text-white font-bold font-mono">
            <div className="w-2/5 flex items-center justify-end">
              <div className="text-xs md:text-2xl text-right">
                Kakamega Homeboyz
              </div>
              <div>
                <Image
                  src="/homeLogo.png"
                  alt="teamName"
                  width={90}
                  height={90}
                  className="object-contain"
                />
              </div>
            </div>
            <div className="w-1/5 flex items-center justify-center font-bold md:text-2xl text-xl">
              VS
            </div>
            <div className="w-2/5 flex items-center justify-start">
              <div>
                <Image
                  src="/awayLogo.png"
                  alt="teamName"
                  width={90}
                  height={90}
                  className="object-contain"
                />
              </div>
              <div className="text-xs md:text-2xl">Manchester United</div>
            </div>
          </div>

          <TabsList className="w-full">
            <TabsTrigger value="home">Home Line Up</TabsTrigger>
            <TabsTrigger value="away">Away Line Up</TabsTrigger>
            <TabsTrigger value="data">Match Data</TabsTrigger>
          </TabsList>
        </header>

        <TabsContent value={"home"}>
          <Lineups data={hData} />
        </TabsContent>

        <TabsContent value="away">
          <Lineups data={aData} />
        </TabsContent>

        <TabsContent value="data">Match Data</TabsContent>
      </Tabs>
    </main>
  );
};

const Lineups = ({ data }: { data: Lineup[] }) => {
  // const first11 = data?.filter((item) => item.player_type === "first11");
  // const subs = data?.filter((item) => item.player_type === "sub");

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
