import Image from "next/image";

import PercentBar from "@/components/shared/percent-bar";
import { Card, CardContent } from "@/components/ui/card";

type HeaderProps = {
  scores: Scores;
  details: FixtureDetails;
  rugby?: boolean;
};

const TeamStatsHeader = ({ scores, details, rugby }: HeaderProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col pt-2 space-y-6">
        <div className="flex justify-between gap-2 text-xs font-mono overflow-hidden whitespace-nowrap">
          <p className="w-3/4">{details.league}</p>
          <p className="w-1/4">Round: {details.matchday}</p>
        </div>

        <div className="w-full  flex justify-evenly items-center gap-4">
          <div className="w-1/3 flex flex-col items-center gap-1">
            <Image src={"/homeLogo.png"} width={45} height={100} alt="" />
            <p className="text-xs text-center w-full font-medium overflow-hidden text-ellipsis whitespace-nowrap">
              {details.team1_name}
            </p>
          </div>
          <div className="text-2xl font-semibold">
            {scores.Home} : {scores.Away}
          </div>

          <div className="w-1/3 flex flex-col items-center gap-1">
            <Image src={"/awayLogo.png"} width={45} height={100} alt="" />
            <p className="text-xs text-center w-full font-medium overflow-hidden text-ellipsis whitespace-nowrap">
              {details.team2_name}
            </p>
          </div>
        </div>

        <PercentBar hValue={"75"} aValue={"25"} stat={"possession"} />

        {rugby && <PercentBar hValue={"72"} aValue={"28"} stat={"territory"} />}
      </CardContent>
    </Card>
  );
};

export default TeamStatsHeader;
