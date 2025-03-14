import Image from "next/image";

import PercentBar from "@/components/shared/percent-bar";
import { Card, CardContent } from "@/components/ui/card";

type HeaderProps = {
  details: Details;
  rugby?: boolean;
  territory?: Stat;
};

const TeamStatsHeader = ({ details, rugby, territory }: HeaderProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col pt-2 space-y-6">
        <div className="flex justify-between gap-2 text-xs font-mono overflow-hidden whitespace-nowrap">
          <p className="w-3/4">{details.league}</p>
          <p className="w-1/4">Round: {details.round}</p>
        </div>

        <div className="w-full  flex justify-evenly items-center gap-4">
          <div className="w-1/3 flex flex-col items-center gap-1">
            <Image src={"/homeLogo.png"} width={45} height={100} alt="" />
            <p className="text-xs text-center w-full font-medium overflow-hidden text-ellipsis whitespace-nowrap">
              {details.home}
            </p>
          </div>
          <div className="text-xl font-semibold">
            {details.homeScore} : {details.awayScore}
          </div>

          <div className="w-1/3 flex flex-col items-center gap-1">
            <Image src={"/awayLogo.png"} width={45} height={100} alt="" />
            <p className="text-xs text-center w-full font-medium overflow-hidden text-ellipsis whitespace-nowrap">
              {details.away}
            </p>
          </div>
        </div>

        <PercentBar
          hValue={details.hPossession.toString()}
          aValue={details.aPossession.toString()}
          stat={"possession"}
        />

        {rugby && (
          <PercentBar
            hValue={territory!.home.toString()}
            aValue={territory!.away.toString()}
            stat={"territory"}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default TeamStatsHeader;
