import HorizontalBar from "@/components/shared/horizontal-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RugbyTeamZone = () => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Zones of Play</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        <HorizontalBar hValue={"1"} aValue={"1"} stat={"own 22"} />
        <HorizontalBar hValue={"23"} aValue={"15"} stat={"own 50"} />
        <HorizontalBar hValue={"44"} aValue={"16"} stat={"opp 50"} />
        <HorizontalBar hValue={"46"} aValue={"0"} stat={"opp 22"} />
      </CardContent>
    </Card>
  );
};

export default RugbyTeamZone;
