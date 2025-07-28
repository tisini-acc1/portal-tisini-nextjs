import React, { Suspense } from "react";
import { getEvents } from "@/data/general/fixture-events";
import { getFixtureStats } from "@/data/stats/team-stats";
import { getPlayersData } from "@/data/stats/player-stats";
import { getVideoEvents } from "@/data/stats/video-events";
import Loading from "@/app/home/loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import TeamStats from "@/app/(home)/teams/components/teams/results/teams/team-stats";
import PlayerStats from "@/app/(home)/teams/components/teams/results/players/player-stats";
import VideoAnalysis from "@/app/(home)/teams/components/teams/results/video/video-analysis";
import SequenceAnalysis from "@/app/(home)/teams/components/teams/results/video/sequence-analysis";

type SingleProps = {
  params: Promise<{ teamId: string; fixId: string }>;
};

const SingleResultPage = async ({ params }: SingleProps) => {
  const { teamId, fixId } = await params;

  const fixture = fixId.split("-") || "";
  const team = teamId.split("-").pop();

  // const teamData = await getFixtureStats(fixture[1]);
  // const playerData = await getPlayersData(fixture[1], 0);
  // const videoData = await getVideoEvents(fixture[1]);
  // const fixEvents = await getEvents(fixture[0]);

  const [teamData, playerData, videoData, fixEvents] = await Promise.all([
    getFixtureStats(fixture[1]),
    getPlayersData(fixture[1], 0),
    getVideoEvents(fixture[1]),
    getEvents(fixture[0]),
  ]);

  const details = teamData?.fixture[0];
  const scores = teamData?.scores;

  const fixDetail = teamData && teamData?.fixture[0];
  const pdfName =
    team === fixDetail?.team1_id
      ? `${fixDetail.team1_name} vs ${fixDetail.team2_name}`
      : `${fixDetail?.team2_name}-vs-${fixDetail.team1_name}`;

  return (
    <Suspense fallback={<Loading />}>
      <Tabs defaultValue="team">
        <header className="h-32 bg-header rounded-md w-full">
          <div className="h-24 flex flex-col gap-1 text-white font-bold font-mono">
            <div className="p-1 px-2 flex justify-between gap-2 text-xs font-mono overflow-hidden whitespace-nowrap">
              <p className="sm:w-3/4">{details?.league}</p>
              <p className="sm:w-1/4 text-right">Round: {details?.matchday}</p>
            </div>

            <div className="flex items-center">
              <div className="w-2/5 flex items-center justify-end">
                <div className="text-xs md:text-2xl text-right">
                  {details?.team1_name}
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
                {scores?.Home} : {scores?.Away}
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
                <div className="text-xs md:text-2xl">{details?.team2_name}</div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center bg-slate-50 rounded-md w-full">
            <TabsList className="text-sm">
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="player">Player</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>

              {fixture[0] === "football" && (
                <TabsTrigger value="sequence">Sequence</TabsTrigger>
              )}
            </TabsList>

            {/* <div>filter component</div> */}
            {/* {fixDetail?.fixture_type === "football" && (
              <PDFDownloadLink
                document={
                  <GenFootballPDF
                    data={teamData as FixtureData}
                    videoData={videoData as VideoEvent[]}
                  />
                }
                fileName={`${pdfName}report.pdf`}
                style={{ textDecoration: "none" }} // Removes default link styling
              >
                {({ loading }) => (
                  <Button asChild size="sm" disabled={loading}>
                    <div className="flex items-center gap-2">
                      <Download size={16} />
                      {loading ? "Generating..." : "Download PDF"}
                    </div>
                  </Button>
                )}
              </PDFDownloadLink>
            )} */}
          </div>
        </header>

        <TabsContent value="team">
          <TeamStats
            data={teamData as FixtureData}
            videoData={videoData as VideoEvent[]}
          />
        </TabsContent>

        <TabsContent value="pdf">
          {/* <GenFootballPDF
            data={teamData as FixtureData}
            videoData={videoData as VideoEvent[]}
          /> */}
        </TabsContent>

        <TabsContent value="player">
          <PlayerStats
            pData={playerData as TeamPlayerData}
            tData={teamData as FixtureData}
          />
        </TabsContent>

        <TabsContent value="video">
          <VideoAnalysis
            videoData={videoData as VideoEvent[]}
            fixEvents={fixEvents as EventType[]}
          />
        </TabsContent>

        <TabsContent value="sequence">
          <SequenceAnalysis videoData={videoData as VideoEvent[]} />
        </TabsContent>
      </Tabs>
    </Suspense>
  );
};

export default SingleResultPage;
