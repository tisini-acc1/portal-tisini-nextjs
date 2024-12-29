import Image from "next/image";

import PercentBar from "@/components/shared/percent-bar";
import { Card, CardContent } from "@/components/ui/card";

const RugbyTeamHeader = () => {
  return (
    <Card>
      <CardContent className="flex flex-col space-y-4">
        <div className="w-full  flex justify-evenly items-center pt-3 gap-4">
          <div className="w-1/3 flex flex-col items-center gap-1">
            <Image src={"/afc-logo.png"} width={50} height={100} alt="" />
            <p className="text-xs text-center w-full font-medium overflow-hidden text-ellipsis whitespace-nowrap">
              AFC Leopards
            </p>
          </div>
          <div className="text-1xl font-semibold">123-199</div>

          <div className="w-1/3 flex flex-col items-center gap-1">
            <Image src={"/afc-logo.png"} width={50} height={100} alt="" />
            <p className="text-xs text-center w-full font-medium overflow-hidden text-ellipsis whitespace-nowrap">
              Baba Dogo United FC sc
            </p>
          </div>
        </div>

        <PercentBar hValue={"75"} aValue={"25"} stat={"possession"} />
        <PercentBar hValue={"72"} aValue={"28"} stat={"territory"} />
      </CardContent>
    </Card>
  );
};

export default RugbyTeamHeader;
