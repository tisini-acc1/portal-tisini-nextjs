import StatsRow from "@/components/shared/stats-row";
import RoundedBar from "@/components/shared/rounded-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RugbyTeamDefense = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Defense</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <StatsRow hValue={"19"} aValue={"70"} stat={"negative tackles"} />
        <StatsRow hValue={"27"} aValue={"20"} stat={"positive tackles"} />
        <RoundedBar
          hValue={46}
          aValue={48}
          hPercent={87}
          aPercent={88}
          stat={"successful tackles"}
        />
        <StatsRow hValue={"6"} aValue={"13"} stat={"missed tackles"} />
        <StatsRow hValue={"8"} aValue={"6"} stat={"turnovers won"} />
      </CardContent>
    </Card>
  );
};

export default RugbyTeamDefense;
