import RoundedBar from "@/components/shared/rounded-bar";
import StatsRow from "@/components/shared/stats-row";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FootballDisciplineStats = () => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Discipline</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        <RoundedBar
          hValue={5}
          aValue={6}
          hPercent={30}
          aPercent={23}
          stat={"Tackles"}
        />

        <StatsRow hValue={"4"} aValue={"6"} stat={"Fouls Committed"} />

        <StatsRow hValue={"1"} aValue={"3"} stat={"Fouls Won"} />

        <StatsRow hValue={"4"} aValue={"6"} stat={"Yellow Cards"} />

        <StatsRow hValue={"1"} aValue={"3"} stat={"Red Cards"} />
      </CardContent>
    </Card>
  );
};

export default FootballDisciplineStats;
