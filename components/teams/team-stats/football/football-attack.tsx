import RoundedBar from "@/components/shared/rounded-bar";
import HorizontalBar from "@/components/shared/horizontal-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FootballTeamAttack = ({ data }: { data: FootballAttack }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attack</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <RoundedBar
          hValue={data.shotInBox.home.value}
          aValue={data.shotInBox.away.value}
          hPercent={43}
          aPercent={57}
          stat={"Attemps inside box"}
          hTotal={data.shotInBox.home.total}
          aTotal={data.shotInBox.away.total}
        />

        <RoundedBar
          hValue={data.shotOutBox.home.value}
          aValue={data.shotOutBox.away.value}
          hPercent={43}
          aPercent={57}
          stat={"Attemps outside box"}
          hTotal={data.shotOutBox.home.total}
          aTotal={data.shotOutBox.away.total}
        />

        <HorizontalBar
          hValue={data.keyPass.home.toString()}
          aValue={data.keyPass.away.toString()}
          stat={"Key Pass"}
        />

        <HorizontalBar
          hValue={data.setPiece.home.toString()}
          aValue={data.setPiece.away.toString()}
          stat={"Set-piece chance"}
        />

        <HorizontalBar
          hValue={data.freekick.home.toString()}
          aValue={data.freekick.away.toString()}
          stat={"Freekick 1/3"}
        />

        <HorizontalBar
          hValue={data.boxTouch.home.toString()}
          aValue={data.boxTouch.away.toString()}
          stat={"Touch in opp box"}
        />

        <HorizontalBar
          hValue={data.boxCarry.home.toString()}
          aValue={data.boxCarry.away.toString()}
          stat={"Carry in opp box"}
        />

        <HorizontalBar
          hValue={data.offside.home.toString()}
          aValue={data.offside.away.toString()}
          stat={"Offside"}
        />
      </CardContent>
    </Card>
  );
};

export default FootballTeamAttack;
