import RoundedBar from "@/components/shared/rounded-bar";
import HorizontalBar from "@/components/shared/horizontal-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RugbyTeamAttack = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attack</CardTitle>
      </CardHeader>

      <CardContent className="space-y-7">
        <HorizontalBar hValue={"10"} aValue={"0"} stat={"tries"} />
        <HorizontalBar hValue={"19"} aValue={"32"} stat={"carries"} />
        <RoundedBar
          hValue={34}
          aValue={56}
          stat={"pass accuracy"}
          hTotal={45}
          aTotal={64}
          hPercent={0}
          aPercent={0}
        />
        <HorizontalBar hValue={"21"} aValue={"11"} stat={"handling errors"} />
        <HorizontalBar hValue={"12"} aValue={"1"} stat={"line breaks"} />
        <HorizontalBar hValue={"7"} aValue={"1"} stat={"offloads"} />
        <RoundedBar
          hValue={10}
          aValue={3}
          hPercent={90}
          aPercent={67}
          stat={"conversions"}
          hTotal={13}
          aTotal={6}
        />
        <HorizontalBar hValue={"16"} aValue={"3"} stat={"opponent 22 visit"} />
      </CardContent>
    </Card>
  );
};

export default RugbyTeamAttack;
