// import { getTeamLineup } from "@/actions/php-actions";
// import FixtureData from "@/components/match-officials/fixtures/fixture-data";
import VerifyPlayerCard from "@/components/match-officials/verify-player-card";
import RefFixHeader from "@/components/match-officials/fixtures/ref-fix-header";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RefFixtureDetails, {
  RefreeCard,
} from "@/components/match-officials/fixtures/ref-fix-details";
// import MatchSheetHeader from "@/components/match-sheet/match-sheet-header";
// import FixCommentModal from "@/components/match-officials/fixtures/fix-comment-modal";

type LineupProps = {
  params: Promise<{ fixId: string }>;
};

const LineupPage = async ({ params }: LineupProps) => {
  const { fixId } = await params;

  const fixture = fixId.split("-");

  console.log(fixture);

  // const hData = await getTeamLineup(fixture[0], fixture[1]);
  // const aData = await getTeamLineup(fixture[0], fixture[2]);
  // const refEvents = await getOfficialsEvents();

  // console.log(hData);
  // console.log(aData);
  // console.log(refEvents);

  return (
    <main className="space-y-4">
      <RefFixHeader />

      <section>
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-4">
          <div className="col-span-8 space-y-2 shadow-md p-3 bg-gray-100 rounded-md">
            <strong>Match Officials</strong>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <RefreeCard title="Commissioner" />
              <RefreeCard title="Center Refree" />
              <RefreeCard title="1st Assistant Refree" />
              <RefreeCard title="2nd Assistant Refree" />
              <RefreeCard title="Reserve Refree" />
            </div>
          </div>

          <div className="col-span-4 space-y-4 shadow-md p-3 bg-gray-100 rounded-md">
            <strong>Match Conditions</strong>

            <div className="flex flex-col gap-4 p-2">
              <p className="p-2 border bg-gray-50">
                <strong>Weather:</strong>{" "}
                <span className="text-muted-foreground text-xs md:text-sm">
                  {"Sunny"}
                </span>
              </p>

              <p className="p-2 border bg-gray-50">
                <strong>Pitch:</strong>{" "}
                <span className="text-muted-foreground text-xs md:text-sm">
                  {"Pathetic"}
                </span>
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <strong>Match Comments</strong>

                {/* <FixCommentModal wCond={wCond} pCond={pitchCond} /> */}
              </div>

              <div className="border h-48 p-2 bg-gray-50">
                <p className="text-muted-foreground text-xs md:text-sm">
                  {"commisioner_comment"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RefFixtureDetails />
      {/* <FixtureData home={hData} away={aData} homeId={fixture[1]} /> */}
    </main>
    // <main>
    //   <Tabs defaultValue="details">
    //     <header className="h-32 bg-header rounded-md">
    //       <RefFixHeader />

    //       <TabsList className="w-full text-sm">
    //         <TabsTrigger value="details">Info</TabsTrigger>
    //         <TabsTrigger value="home">Home Lineup</TabsTrigger>
    //         <TabsTrigger value="away">Away Lineup</TabsTrigger>
    //         <TabsTrigger value="data">Match Data</TabsTrigger>
    //       </TabsList>
    //     </header>

    //     <TabsContent value={"details"}>
    //       <RefFixtureDetails />
    //     </TabsContent>

    //     <TabsContent value={"home"}>
    //       <Lineups data={hData} />
    //     </TabsContent>

    //     <TabsContent value="away">
    //       <Lineups data={aData} />
    //     </TabsContent>

    //     <TabsContent value="data">
    //       <FixtureData home={hData} away={aData} homeId={fixture[1]} />
    //     </TabsContent>
    //   </Tabs>
    // </main>
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
