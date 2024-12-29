import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import StatsRow from "@/components/shared/stats-row";
import RoundedBar from "@/components/shared/rounded-bar";

const FootballTeamDefense = () => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Defense</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        <RoundedBar
          hValue={5}
          aValue={6}
          hPercent={67}
          aPercent={50}
          stat={"Tackle won"}
        />

        <StatsRow hValue={"1"} aValue={"2"} stat={"Clearances"} />

        <StatsRow hValue={"1"} stat={"Blocks"} aValue={"2"} />

        <StatsRow hValue={"1"} stat={"Interceptions own half"} aValue={"2"} />

        <StatsRow hValue={"1"} stat={"Interceptions opp half"} aValue={"2"} />

        <StatsRow hValue={"1"} aValue={"2"} stat={"Foul won"} />
      </CardContent>
    </Card>
  );
};

export default FootballTeamDefense;
