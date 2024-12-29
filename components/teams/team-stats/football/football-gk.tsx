import StatsRow from "@/components/shared/stats-row";
import RoundedBar from "@/components/shared/rounded-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FootballTeamGK = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Goalkeeping</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <StatsRow hValue={"1"} stat={"Saves"} aValue={"2"} />

        <RoundedBar
          hValue={5}
          aValue={6}
          hPercent={67}
          aPercent={50}
          stat={"Run-outs"}
        />

        <RoundedBar
          hValue={5}
          aValue={6}
          hPercent={67}
          aPercent={73}
          stat={"Claims"}
        />

        <RoundedBar
          hValue={5}
          aValue={6}
          hPercent={37}
          aPercent={13}
          stat={"Throw-outs"}
        />
      </CardContent>
    </Card>
  );
};

export default FootballTeamGK;
