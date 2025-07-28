import StatsRow from "@/components/shared/charts/stats-row";
import HorizontalBar from "@/components/shared/charts/horizontal-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RugbyTeamDiscipline = ({ data }: { data: RugbyDiscipline }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Discipline</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 md:space-y-10 md:pt-4">
        <HorizontalBar
          hValue={data.penalty.home.toString()}
          aValue={data.penalty.away.toString()}
          stat={"penalties conceded"}
        />
        <StatsRow
          hValue={data.cards.Homeyellow.toString()}
          aValue={data.cards.Awayyellow.toString()}
          stat={"yellow cards"}
        />
        <StatsRow
          hValue={data.cards.Homered.toString()}
          aValue={data.cards.Awayred.toString()}
          stat={"red cards"}
        />
      </CardContent>
    </Card>
  );
};

export default RugbyTeamDiscipline;
