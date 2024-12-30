import RoundedBar from "@/components/shared/rounded-bar";
import HorizontalBar from "@/components/shared/horizontal-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FootballTeamPasses = () => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Passing</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <RoundedBar
          hValue={65}
          aValue={45}
          hPercent={56}
          aPercent={87}
          stat={"Complete Pass"}
          hTotal={70}
          aTotal={60}
        />
        <RoundedBar
          hValue={65}
          aValue={45}
          hPercent={56}
          aPercent={87}
          stat={"complete Prog pass"}
          hTotal={70}
          aTotal={60}
        />

        <HorizontalBar hValue={"23"} aValue={"18"} stat={"Ball won"} />

        <HorizontalBar hValue={"23"} aValue={"38"} stat={"Ball lost"} />

        <HorizontalBar hValue={"23"} aValue={"24"} stat={"Throw-in"} />

        <HorizontalBar hValue={"23"} aValue={"16"} stat={"Long Throw-in"} />

        <RoundedBar
          hValue={65}
          aValue={45}
          hPercent={56}
          aPercent={87}
          stat={"complete Cross Right"}
          hTotal={70}
          aTotal={60}
        />
        <RoundedBar
          hValue={65}
          aValue={45}
          hPercent={56}
          aPercent={87}
          stat={"complete Cross Left"}
          hTotal={70}
          aTotal={60}
        />

        <HorizontalBar hValue={"23"} aValue={"16"} stat={"Cornerkicks"} />
      </CardContent>
    </Card>
  );
};

export default FootballTeamPasses;
