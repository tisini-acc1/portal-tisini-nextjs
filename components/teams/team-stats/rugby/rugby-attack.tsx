import RoundedBar from "@/components/shared/rounded-bar";
import HorizontalBar from "@/components/shared/horizontal-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RugbyTeamAttack = ({ data }: { data: RugbyAttack }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attack</CardTitle>
      </CardHeader>

      <CardContent className="space-y-7">
        <HorizontalBar
          hValue={data.tries.home.toString()}
          aValue={data.tries.away.toString()}
          stat={"tries"}
        />
        <HorizontalBar
          hValue={data.carries.home.toString()}
          aValue={data.carries.away.toString()}
          stat={"carries"}
        />
        <RoundedBar
          hValue={data.passAcc.home.value}
          aValue={data.passAcc.away.value}
          stat={"pass accuracy"}
          hTotal={data.passAcc.home.total}
          aTotal={data.passAcc.away.total}
          hPercent={0}
          aPercent={0}
        />
        <HorizontalBar
          hValue={data.handlingErrors.home.toString()}
          aValue={data.handlingErrors.away.toString()}
          stat={"handling errors"}
        />
        <HorizontalBar
          hValue={data.linebreaks.home.toString()}
          aValue={data.linebreaks.away.toString()}
          stat={"line breaks"}
        />
        <HorizontalBar
          hValue={data.offloads.home.toString()}
          aValue={data.offloads.away.toString()}
          stat={"offloads"}
        />
        <RoundedBar
          hValue={data.conversion.home.value}
          aValue={data.conversion.away.value}
          hPercent={90}
          aPercent={67}
          stat={"conversions"}
          hTotal={data.conversion.home.total}
          aTotal={data.conversion.away.total}
        />
        <HorizontalBar
          hValue={data.oppVisit22.home.toString()}
          aValue={data.oppVisit22.away.toString()}
          stat={"opponent 22 visit"}
        />
      </CardContent>
    </Card>
  );
};

export default RugbyTeamAttack;
