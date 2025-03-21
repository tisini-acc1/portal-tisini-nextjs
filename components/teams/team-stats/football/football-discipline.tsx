import StatsRow from "@/components/shared/charts/stats-row";
import HorizontalBar from "@/components/shared/charts/horizontal-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FootballDisciplineStats = ({ data }: { data: FootballDiscipline }) => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Discipline</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        <HorizontalBar
          hValue={data.fouls.home.toString()}
          aValue={data.fouls.away.toString()}
          stat={"Fouls Committed"}
        />

        <StatsRow
          hValue={data.cards.Homeyellow.toString()}
          aValue={data.cards.Awayyellow.toString()}
          stat={"Yellow Cards"}
        />

        <StatsRow
          hValue={data.cards.Homered.toString()}
          aValue={data.cards.Awayred.toString()}
          stat={"Red Cards"}
        />
      </CardContent>
    </Card>
  );
};

export default FootballDisciplineStats;
