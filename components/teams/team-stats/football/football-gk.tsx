import RoundedBar from "@/components/shared/rounded-bar";
import HorizontalBar from "@/components/shared/horizontal-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FootballTeamGK = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Goalkeeping</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <HorizontalBar hValue={"2"} aValue={"3"} stat={"Saves"} />

        <HorizontalBar hValue={"2"} aValue={"3"} stat={"Run-outs"} />

        <RoundedBar
          hValue={5}
          aValue={6}
          hPercent={67}
          aPercent={73}
          stat={"successful claims"}
          hTotal={8}
          aTotal={9}
        />

        <RoundedBar
          hValue={5}
          aValue={6}
          hPercent={67}
          aPercent={73}
          stat={"short Goal kicks"}
          hTotal={8}
          aTotal={9}
        />

        <HorizontalBar hValue={"7"} aValue={"3"} stat={"kick-outs"} />
        <HorizontalBar hValue={"7"} aValue={"3"} stat={"Throw-outs"} />
      </CardContent>
    </Card>
  );
};

export default FootballTeamGK;
