import StatsRow from "@/components/shared/stats-row";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RugbyTeamRestarts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Restarts Won</CardTitle>
      </CardHeader>

      <CardContent>
        <StatsRow hValue={"10"} aValue={"2"} stat={"Restarts won"} />
      </CardContent>
    </Card>
  );
};

export default RugbyTeamRestarts;
