import RoundedBar from "@/components/shared/rounded-bar";
import StatsRow from "@/components/shared/stats-row";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FootballTeamPasses = () => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Passing</CardTitle>
      </CardHeader>

      <CardContent className="space-y-7">
        <RoundedBar
          hValue={65}
          aValue={45}
          hPercent={56}
          aPercent={87}
          stat={"Complete Pass"}
        />
        <RoundedBar
          hValue={65}
          aValue={45}
          hPercent={56}
          aPercent={87}
          stat={"Progressive pass"}
        />

        <StatsRow hValue={"23"} aValue={"18"} stat={"Throw-in"} />

        <StatsRow hValue={"23"} aValue={"18"} stat={"Ball won"} />

        <StatsRow hValue={"23"} aValue={"18"} stat={"Ball lost"} />

        <RoundedBar
          hValue={65}
          aValue={45}
          hPercent={56}
          aPercent={87}
          stat={"Cross Right"}
        />
        <RoundedBar
          hValue={65}
          aValue={45}
          hPercent={56}
          aPercent={87}
          stat={"Cross Left"}
        />

        <StatsRow hValue={"23"} aValue={"18"} stat={"Cornerkick"} />
      </CardContent>
    </Card>
  );
};

export default FootballTeamPasses;
