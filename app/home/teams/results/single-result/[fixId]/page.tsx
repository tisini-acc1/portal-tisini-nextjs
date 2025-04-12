import Image from "next/image";

import TeamStats from "@/components/teams/results/teams/team-stats";
import { getFixtureStats, getPlayersData } from "@/actions/php-actions";
import PlayerStats from "@/components/teams/results/players/player-stats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type RProps = {
  params: Promise<{ fixId: string }>;
};

const SingleResultPage = async ({ params }: RProps) => {
  const { fixId } = await params;

  const playersData = await getPlayersData(fixId);
  const teamData = await getFixtureStats(fixId);

  const details = teamData?.fixture[0];
  const scores = teamData?.scores;

  // const fixType = teamData && teamData["fixture"][0].fixture_type;

  // console.log(playersData);
  // console.log(teamData);

  return (
    <main className="overflow-hidden">
      <Tabs defaultValue="team">
        <header className="h-32 bg-header rounded-md w-full max-w-[100vw] overflow-hidden">
          <div className="h-24 flex flex-col gap-1 text-white font-bold font-mono">
            <div className="p-1 px-2 flex justify-between gap-2 text-xs font-mono overflow-hidden whitespace-nowrap">
              <p className="sm:w-3/4">{details.league}</p>
              <p className="sm:w-1/4 text-right">Round: {details.matchday}</p>
            </div>

            <div className="flex items-center">
              <div className="w-2/5 flex items-center justify-end">
                <div className="text-xs md:text-2xl text-right">
                  {details.team1_name}
                </div>
                <div>
                  <Image
                    src="/homeLogo.png"
                    alt="teamName"
                    width={55}
                    height={55}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="w-1/5 flex items-center justify-center font-bold md:text-2xl text-xl">
                {scores.Home} : {scores.Away}
              </div>
              <div className="w-2/5 flex items-center justify-start">
                <div>
                  <Image
                    src="/awayLogo.png"
                    alt="teamName"
                    width={55}
                    height={55}
                    className="object-contain"
                  />
                </div>
                <div className="text-xs md:text-2xl">{details.team2_name}</div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center bg-slate-50 rounded-md w-full max-w-[100vw] overflow-hidden">
            <TabsList className="text-sm">
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="player">Player</TabsTrigger>
            </TabsList>

            {/* <div>filter component</div> */}
          </div>
        </header>

        <div className="overflow-x-auto">
          <div className="min-w-max">
            <TabsContent value="team">
              <TeamStats data={teamData as FixtureData} />
            </TabsContent>

            <TabsContent value="player">
              <PlayerStats pData={playersData} tData={teamData} />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </main>
  );
};

export default SingleResultPage;
