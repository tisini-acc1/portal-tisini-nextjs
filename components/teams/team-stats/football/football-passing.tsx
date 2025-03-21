import RoundedBar from "@/components/shared/charts/rounded-bar";
import HorizontalBar from "@/components/shared/charts/horizontal-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FootballTeamPasses = ({ data }: { data: FootballPassing }) => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Passing</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <RoundedBar
          hValue={data.pass.home.value}
          aValue={data.pass.away.value}
          hPercent={56}
          aPercent={87}
          stat={"Complete Pass"}
          hTotal={data.pass.home.total}
          aTotal={data.pass.away.total}
        />
        <RoundedBar
          hValue={data.progPass.home.value}
          aValue={data.progPass.away.value}
          hPercent={56}
          aPercent={87}
          stat={"complete Prog pass"}
          hTotal={data.progPass.home.total}
          aTotal={data.progPass.away.total}
        />

        <HorizontalBar
          hValue={data.ballWon.home.toString()}
          aValue={data.ballWon.away.toString()}
          stat={"Ball won"}
        />

        <HorizontalBar
          hValue={data.ballLost.home.toString()}
          aValue={data.ballLost.away.toString()}
          stat={"Ball lost"}
        />

        <HorizontalBar
          hValue={data.throwIn.home.toString()}
          aValue={data.throwIn.away.toString()}
          stat={"Throw-in"}
        />

        <HorizontalBar
          hValue={data.longThrowIn.home.toString()}
          aValue={data.longThrowIn.away.toString()}
          stat={"Long Throw-in"}
        />

        <RoundedBar
          hValue={data.crossRight.home.value}
          aValue={data.crossRight.away.value}
          hPercent={56}
          aPercent={87}
          stat={"complete Cross Right"}
          hTotal={data.crossRight.home.total}
          aTotal={data.crossRight.away.total}
        />
        <RoundedBar
          hValue={data.crossLeft.home.value}
          aValue={data.crossLeft.away.value}
          hPercent={56}
          aPercent={87}
          stat={"complete Cross Left"}
          hTotal={data.crossLeft.home.total}
          aTotal={data.crossLeft.away.total}
        />

        <HorizontalBar
          hValue={data.corner.home.toString()}
          aValue={data.corner.away.toString()}
          stat={"Cornerkicks"}
        />
      </CardContent>
    </Card>
  );
};

export default FootballTeamPasses;
