import { getEvent, getSubEvent } from "@/lib/utils";
import StatsRow from "@/components/shared/charts/stats-row";
import HorizontalBar from "@/components/shared/charts/horizontal-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BasketballRebounds = ({ home, away }: { home: Stats; away: Stats }) => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Rebounds</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        <HorizontalBar
          hValue={getEvent(home, "174").toString()}
          aValue={getEvent(away, "174").toString()}
          stat={"Total rebounds"}
        />

        <StatsRow
          hValue={getSubEvent(home, "174", "437").toString()}
          aValue={getSubEvent(away, "174", "437").toString()}
          stat={"Offensive"}
        />

        <StatsRow
          hValue={getSubEvent(home, "174", "438").toString()}
          aValue={getSubEvent(away, "174", "438").toString()}
          stat={"Defensive"}
        />
      </CardContent>
    </Card>
  );
};

export default BasketballRebounds;
