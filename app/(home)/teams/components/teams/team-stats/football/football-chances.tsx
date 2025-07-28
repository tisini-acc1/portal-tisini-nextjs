import StatsRow from "@/components/shared/charts/stats-row";
import HorizontalBar from "@/components/shared/charts/horizontal-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FootballChanceStats = ({ data }: { data: FootballChance }) => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Chances</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        <HorizontalBar
          hValue={data.chances.home.toString()}
          aValue={data.chances.away.toString()}
          stat={"Chances"}
        />

        <StatsRow
          hValue={data.cross.home.toString()}
          aValue={data.cross.away.toString()}
          stat={"Cross"}
        />

        <StatsRow
          hValue={data.keyPass.home.toString()}
          aValue={data.keyPass.away.toString()}
          stat={"Key pass"}
        />

        <StatsRow
          hValue={data.freeKick.home.toString()}
          aValue={data.freeKick.away.toString()}
          stat={"Freekick"}
        />

        <StatsRow
          hValue={data.cornerKick.home.toString()}
          aValue={data.cornerKick.away.toString()}
          stat={"Cornerkick"}
        />

        <StatsRow
          hValue={data.throwin.home.toString()}
          aValue={data.throwin.away.toString()}
          stat={"Throw-in"}
        />
      </CardContent>
    </Card>
  );
};

export default FootballChanceStats;
