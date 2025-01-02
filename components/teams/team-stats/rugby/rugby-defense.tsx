import RoundedBar from "@/components/shared/rounded-bar";
import HorizontalBar from "@/components/shared/horizontal-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RugbyTeamDefense = ({ data }: { data: RugbyDefense }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Defense</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <HorizontalBar
          hValue={data.negTackle.home.toString()}
          aValue={data.negTackle.away.toString()}
          stat={"negative tackles"}
        />
        <HorizontalBar
          hValue={data.posTackle.home.toString()}
          aValue={data.posTackle.away.toString()}
          stat={"positive tackles"}
        />

        <RoundedBar
          hValue={data.succTackle.home.value}
          aValue={data.succTackle.away.value}
          hPercent={87}
          aPercent={88}
          stat={"successful tackles"}
          hTotal={data.succTackle.home.total}
          aTotal={data.succTackle.away.total}
        />
        <HorizontalBar
          hValue={data.missedTackle.home.toString()}
          aValue={data.missedTackle.away.toString()}
          stat={"missed tackles"}
        />
        <HorizontalBar
          hValue={data.turnoversWon.home.toString()}
          aValue={data.turnoversWon.away.toString()}
          stat={"turnovers won"}
        />
      </CardContent>
    </Card>
  );
};

export default RugbyTeamDefense;
