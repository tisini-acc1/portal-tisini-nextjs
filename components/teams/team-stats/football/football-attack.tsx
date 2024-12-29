import RoundedBar from "@/components/shared/rounded-bar";
import StatsRow from "@/components/shared/stats-row";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FootballTeamAttack = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attack</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <RoundedBar
          hValue={8}
          aValue={13}
          hPercent={43}
          aPercent={57}
          stat={"Attemps inside box"}
        />

        <RoundedBar
          hValue={8}
          aValue={13}
          hPercent={43}
          aPercent={57}
          stat={"Attemps outside box"}
        />

        <StatsRow hValue={"3"} aValue={"2"} stat={"Key Passes"} />

        <StatsRow hValue={"3"} aValue={"2"} stat={"Set-piece chances"} />

        <StatsRow hValue={"3"} aValue={"2"} stat={"Freekick 1/3"} />

        <StatsRow hValue={"3"} aValue={"2"} stat={"Touches in opp box"} />

        <StatsRow hValue={"3"} aValue={"2"} stat={"Carries in opp box"} />

        <StatsRow hValue={"3"} aValue={"2"} stat={"Offsides"} />
      </CardContent>
    </Card>
  );
};

export default FootballTeamAttack;
