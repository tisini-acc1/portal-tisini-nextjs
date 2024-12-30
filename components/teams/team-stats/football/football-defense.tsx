import RoundedBar from "@/components/shared/rounded-bar";
import HorizontalBar from "@/components/shared/horizontal-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
          stat={"Tackle made"}
          hTotal={7}
          aTotal={6}
        />

        <HorizontalBar hValue={"1"} aValue={"2"} stat={"Clearances"} />

        <HorizontalBar hValue={"11"} aValue={"22"} stat={"Blocks"} />

        <HorizontalBar
          hValue={"21"}
          aValue={"6"}
          stat={"Interceptions own half"}
        />

        <HorizontalBar
          hValue={"13"}
          aValue={"9"}
          stat={"Interceptions opp half"}
        />

        <HorizontalBar hValue={"10"} aValue={"2"} stat={"Foul won"} />
      </CardContent>
    </Card>
  );
};

export default FootballTeamDefense;
