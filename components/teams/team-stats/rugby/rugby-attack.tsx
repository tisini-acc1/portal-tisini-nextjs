import RoundedBar from "@/components/shared/rounded-bar";
import StatsRow from "@/components/shared/stats-row";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RugbyTeamAttack = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attack</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        <StatsRow hValue={"10"} aValue={"0"} stat={"tries"} />
        <StatsRow hValue={"19"} aValue={"32"} stat={"carries"} />
        <RoundedBar
          hValue={56}
          aValue={56}
          hPercent={90}
          aPercent={90}
          stat={"pass accuracy"}
        />
        <StatsRow hValue={"21"} aValue={"11"} stat={"handling errors"} />
        <StatsRow hValue={"12"} aValue={"1"} stat={"line breaks"} />
        <StatsRow hValue={"7"} aValue={"1"} stat={"offloads"} />
        <RoundedBar
          hValue={10}
          aValue={3}
          hPercent={90}
          aPercent={67}
          stat={"conversions"}
        />
        <StatsRow hValue={"16"} aValue={"3"} stat={"opponent 22 visit"} />
      </CardContent>
    </Card>
  );
};

export default RugbyTeamAttack;
