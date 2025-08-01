"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { PDFDownloadLink } from "@react-pdf/renderer";

import Loading from "@/app/home/loading";
import { useStore } from "@/store/store";
import TeamStats from "./teams/team-stats";
import { Button } from "@/components/ui/button";
import PlayerStats from "./players/player-stats";
import VideoAnalysis from "./video/video-analysis";
import SequenceAnalysis from "./video/sequence-analysis";
import GenFootballPDF from "@/components/pdfs/generate-pdf";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getEvents,
  getFixtureStats,
  getPlayersData,
  getVideoEvents,
} from "@/actions/php-actions";

const SingleResult = ({ fixId }: { fixId: string }) => {
  const teamName = useStore((state) => state.store.team.name);

  const {
    data: teamData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["teamData", fixId],
    queryFn: () => getFixtureStats(fixId),
  });

  const { data: playersData, isLoading: pLoading } = useQuery({
    queryKey: ["playerData", fixId],
    queryFn: () => getPlayersData(fixId, 0),
  });

  const details = teamData?.fixture[0];
  const scores = teamData?.scores;

  const fixType = teamData && teamData["fixture"][0].fixture_type;

  const { data: videoData, isLoading: vLoading } = useQuery({
    queryKey: ["videoData", fixId],
    queryFn: () => getVideoEvents(fixId),
  });

  const { data: events, isLoading: eLoading } = useQuery({
    queryKey: ["fixtureEvents", fixType],
    queryFn: () => getEvents(fixType as string),
  });

  const fixDetail = teamData && teamData?.fixture[0];
  const pdfName =
    teamName === fixDetail?.team1_name
      ? `${teamName} vs ${fixDetail.team2_name}`
      : `${fixDetail?.team2_name}-vs-${teamName}`;

  console.log(fixDetail?.fixture_type);

  if (isLoading || pLoading || vLoading || eLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  return (
    <main className="max-w-full" id="teamstats">
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
              {/* <TabsTrigger value="pdf">pdf</TabsTrigger> */}
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="player">Player</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
              <TabsTrigger value="sequence">Sequence</TabsTrigger>
            </TabsList>

            {/* <div>filter component</div> */}
            {fixDetail?.fixture_type === "football" && (
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
            )}
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
            pData={playersData as TeamPlayerData}
            tData={teamData as FixtureData}
          />
        </TabsContent>

        <TabsContent value="video">
          <VideoAnalysis
            videoData={videoData as VideoEvent[]}
            fixEvents={events as EventType[]}
          />
        </TabsContent>

        <TabsContent value="sequence">
          <SequenceAnalysis videoData={videoData as VideoEvent[]} />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default SingleResult;
