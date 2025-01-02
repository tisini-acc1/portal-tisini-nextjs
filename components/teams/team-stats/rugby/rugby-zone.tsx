import HorizontalBar from "@/components/shared/horizontal-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RugbyTeamZone = ({ data }: { data: RugbyZones }) => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Zones of Play</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <HorizontalBar
          hValue={data.own22.home.toString()}
          aValue={data.own22.away.toString()}
          stat={"own 22"}
        />
        <HorizontalBar
          hValue={data.own50.home.toString()}
          aValue={data.own50.away.toString()}
          stat={"own 50"}
        />
        <HorizontalBar
          hValue={data.opp50.home.toString()}
          aValue={data.opp50.away.toString()}
          stat={"opp 50"}
        />
        <HorizontalBar
          hValue={data.opp22.home.toString()}
          aValue={data.opp22.away.toString()}
          stat={"opp 22"}
        />
      </CardContent>
    </Card>
  );
};

export default RugbyTeamZone;
