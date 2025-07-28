import RoundedBar from "@/components/shared/charts/rounded-bar";
import HorizontalBar from "@/components/shared/charts/horizontal-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FootballTeamDefense = ({ data }: { data: FootballDefense }) => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Defense</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        <RoundedBar
          hValue={data.tackles.home.value}
          aValue={data.tackles.away.value}
          hPercent={67}
          aPercent={50}
          stat={"Tackle made"}
          hTotal={data.tackles.home.total}
          aTotal={data.tackles.away.total}
        />

        <HorizontalBar
          hValue={data.clearance.home.toString()}
          aValue={data.clearance.away.toString()}
          stat={"Clearances"}
        />

        {/* <HorizontalBar
          hValue={data.blocks.home.toString()}
          aValue={data.blocks.away.toString()}
          stat={"Blocks"}
        /> */}

        <HorizontalBar
          hValue={data.intercptOwn.home.toString()}
          aValue={data.intercptOwn.away.toString()}
          stat={"Interceptions own half"}
        />

        <HorizontalBar
          hValue={data.intercptOpp.home.toString()}
          aValue={data.intercptOpp.away.toString()}
          stat={"Interceptions opp half"}
        />

        {/* <HorizontalBar
          hValue={data.foulWon.home.toString()}
          aValue={data.foulWon.away.toString()}
          stat={"Foul won"}
        /> */}
      </CardContent>
    </Card>
  );
};

export default FootballTeamDefense;
