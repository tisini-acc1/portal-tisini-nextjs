import React from "react";

import { passSequenceAnalysis } from "@/lib/pass-sequence";
import { BallWon, GkRestart } from "../football-team-stats";
import StatsRow from "@/components/shared/charts/stats-row";
import FootballDisciplineStats from "./football-discipline";
import RoundedBar from "@/components/shared/charts/rounded-bar";
import HorizontalBar from "@/components/shared/charts/horizontal-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SimpeProps = {
  data: FootballData;
  recovery: BallWon;
  restart: GkRestart;
  videoData: VideoEvent[];
};

const SimpleFootball = ({ data, recovery, restart, videoData }: SimpeProps) => {
  const sequences = passSequenceAnalysis(videoData);

  // Pass sequence metrics
  // const totalSequences = sequences.all_sequence.length;
  // const totalPassCount = sequences.all_sequence.reduce(
  //   (sum, item) => sum + item.Pass_Count,
  //   0
  // );
  // const averagePassSequence = totalPassCount / totalSequences;

  // Pass length distribution
  const sequencesOver10 = sequences.all_sequence.filter(
    (item) => item.Pass_Count >= 10
  ).length;
  const sequences7to9 = sequences.all_sequence.filter(
    (item) => item.Pass_Count >= 7 && item.Pass_Count <= 9
  ).length;
  const sequences4to6 = sequences.all_sequence.filter(
    (item) => item.Pass_Count >= 4 && item.Pass_Count <= 6
  ).length;
  const sequencesBelow3 = sequences.all_sequence.filter(
    (item) => item.Pass_Count < 4
  ).length;

  // console.log(sequences);

  return (
    <div className="space-y-4">
      <div className="w-full">
        <Card className="shadow-lg border-0">
          <CardContent className="p-6 space-y-4">
            {/* <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 font-medium">
                    Total Sequences
                  </p>
                  <p className="text-3xl font-bold">{totalSequences}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 font-medium">
                    Average Pass Sequence
                  </p>
                  <p className="text-3xl font-bold">
                    {averagePassSequence.toFixed(1)}
                  </p>
                </div>
              </div>
            </div> */}

            <div className="col-span-1 md:col-span-4 lg:col-span-3 space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 font-medium">
                    Over 10+ Pass Sequence
                  </p>
                  <p className="text-3xl font-bold">{sequencesOver10}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 font-medium">
                    Between 7 - 9 Pass Sequence
                  </p>
                  <p className="text-3xl font-bold">{sequences7to9}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 font-medium">
                    Between 4 - 6 Pass Sequence
                  </p>
                  <p className="text-3xl font-bold">{sequences4to6}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 font-medium">
                    Below 3 Pass Sequence
                  </p>
                  <p className="text-3xl font-bold">{sequencesBelow3}</p>
                </div>
              </div>

              {/* <TeamStatsHeader details={data.details} /> */}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <StatTile title={"Attack"}>
          <div className="space-y-6">
            <RoundedBar
              hValue={data.attack.shotInBox.home.value}
              aValue={data.attack.shotInBox.away.value}
              hPercent={43}
              aPercent={57}
              stat={"Attemps inside box"}
              hTotal={data.attack.shotInBox.home.total}
              aTotal={data.attack.shotInBox.away.total}
            />

            <RoundedBar
              hValue={data.attack.shotOutBox.home.value}
              aValue={data.attack.shotOutBox.away.value}
              hPercent={43}
              aPercent={57}
              stat={"Attemps outside box"}
              hTotal={data.attack.shotOutBox.home.total}
              aTotal={data.attack.shotOutBox.away.total}
            />
          </div>
        </StatTile>

        <StatTile title={"Ball Recovery"}>
          <div className="space-y-8">
            <HorizontalBar
              hValue={(
                recovery.oppHalf.home + recovery.ownHalf.home
              ).toString()}
              aValue={(
                recovery.oppHalf.away + recovery.ownHalf.away
              ).toString()}
              stat={"Total Recoveries"}
            />

            <StatsRow
              hValue={recovery.oppHalf.home.toString()}
              aValue={recovery.oppHalf.away.toString()}
              stat={"Opponent's half"}
            />

            <StatsRow
              hValue={recovery.ownHalf.home.toString()}
              aValue={recovery.ownHalf.away.toString()}
              stat={"Own half"}
            />
          </div>
        </StatTile>

        <StatTile title={"Goalkeeper"}>
          <div className="space-y-6">
            <HorizontalBar
              hValue={data.gk.saves.home.toString()}
              aValue={data.gk.saves.away.toString()}
              stat={"Saves"}
            />

            <RoundedBar
              hValue={restart.comp.home}
              aValue={restart.comp.away}
              hPercent={67}
              aPercent={73}
              stat={"successful goal kick"}
              hTotal={restart.total.home}
              aTotal={restart.total.away}
            />
          </div>
        </StatTile>

        <FootballDisciplineStats data={data.discipline} />
      </div>
    </div>
  );
};

type StatTileProps = {
  title: string;
  children: React.ReactNode;
};

const StatTile: React.FC<StatTileProps> = ({ title, children }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default SimpleFootball;
