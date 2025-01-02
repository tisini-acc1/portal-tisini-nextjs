import RoundedBar from "@/components/shared/rounded-bar";
import HorizontalBar from "@/components/shared/horizontal-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FootballTeamGK = ({ data }: { data: FootballGK }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Goalkeeping</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <HorizontalBar
          hValue={data.saves.home.toString()}
          aValue={data.saves.away.toString()}
          stat={"Saves"}
        />

        <HorizontalBar
          hValue={data.runOuts.home.toString()}
          aValue={data.runOuts.away.toString()}
          stat={"Run-outs"}
        />

        <RoundedBar
          hValue={data.claims.home.value}
          aValue={data.claims.away.value}
          hPercent={67}
          aPercent={73}
          stat={"successful claims"}
          hTotal={data.claims.home.total}
          aTotal={data.claims.away.total}
        />

        <RoundedBar
          hValue={data.goalkick.home.value}
          aValue={data.goalkick.away.value}
          hPercent={67}
          aPercent={73}
          stat={"successful goal kick"}
          hTotal={data.goalkick.home.total}
          aTotal={data.goalkick.away.total}
        />

        <HorizontalBar
          hValue={data.kickOuts.home.toString()}
          aValue={data.kickOuts.away.toString()}
          stat={"kick-outs"}
        />
        <HorizontalBar
          hValue={data.throwOuts.home.toString()}
          aValue={data.throwOuts.away.toString()}
          stat={"Throw-outs"}
        />
      </CardContent>
    </Card>
  );
};

export default FootballTeamGK;
