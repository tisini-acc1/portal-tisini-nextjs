import RoundedBar from "@/components/shared/rounded-bar";
import HorizontalBar from "@/components/shared/horizontal-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FootballTeamAttack = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attack</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <RoundedBar
          hValue={8}
          aValue={13}
          hPercent={43}
          aPercent={57}
          stat={"Attemps inside box"}
          hTotal={16}
          aTotal={21}
        />

        <RoundedBar
          hValue={8}
          aValue={13}
          hPercent={43}
          aPercent={57}
          stat={"Attemps outside box"}
          hTotal={16}
          aTotal={21}
        />

        <HorizontalBar hValue={"3"} aValue={"2"} stat={"Key Pass"} />

        <HorizontalBar hValue={"3"} aValue={"2"} stat={"Set-piece chance"} />

        <HorizontalBar hValue={"3"} aValue={"2"} stat={"Freekick 1/3"} />

        <HorizontalBar hValue={"3"} aValue={"2"} stat={"Touch in opp box"} />

        <HorizontalBar hValue={"3"} aValue={"2"} stat={"Carry in opp box"} />

        <HorizontalBar hValue={"3"} aValue={"2"} stat={"Offside"} />
      </CardContent>
    </Card>
  );
};

export default FootballTeamAttack;
