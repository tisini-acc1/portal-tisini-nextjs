import { getEvent, getSubEvent } from "@/lib/utils";
import StatsRow from "@/components/shared/charts/stats-row";
import HorizontalBar from "@/components/shared/charts/horizontal-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BasketballFouls = ({ home, away }: { home: Stats; away: Stats }) => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Discipline</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        <HorizontalBar
          hValue={getEvent(home, "177").toString()}
          aValue={getEvent(away, "177").toString()}
          stat={"Fouls Committed"}
        />

        <StatsRow
          hValue={getSubEvent(home, "177", "439").toString()}
          aValue={getSubEvent(away, "177", "439").toString()}
          stat={"Personal fouls"}
        />

        <StatsRow
          hValue={getSubEvent(home, "177", "440").toString()}
          aValue={getSubEvent(away, "177", "440").toString()}
          stat={"Personal shooting"}
        />

        <StatsRow
          hValue={getSubEvent(home, "177", "441").toString()}
          aValue={getSubEvent(away, "177", "441").toString()}
          stat={"Unsportsman"}
        />
      </CardContent>
    </Card>
  );
};

export default BasketballFouls;
