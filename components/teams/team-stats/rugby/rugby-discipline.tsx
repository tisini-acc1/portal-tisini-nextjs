import StatsRow from "@/components/shared/stats-row";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RugbyTeamDiscipline = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Discipline</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <StatsRow hValue={"11"} aValue={"9"} stat={"penalties conceded"} />
        <StatsRow hValue={"0"} aValue={"0"} stat={"yellow cards"} />
        <StatsRow hValue={"0"} aValue={"0"} stat={"red cards"} />
      </CardContent>
    </Card>
  );
};

export default RugbyTeamDiscipline;
