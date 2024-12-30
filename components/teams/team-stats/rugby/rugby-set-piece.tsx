import RoundedBar from "@/components/shared/rounded-bar";
import HorizontalBar from "@/components/shared/horizontal-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RugbyTeamSetPiece = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Pieces</CardTitle>
      </CardHeader>

      <CardContent className="space-y-7">
        <HorizontalBar hValue={"13"} aValue={"18"} stat={"set pieces won"} />

        <RoundedBar
          hValue={4}
          aValue={10}
          hPercent={100}
          aPercent={100}
          stat={"scrum retention"}
          hTotal={9}
          aTotal={10}
        />
        <HorizontalBar hValue={"1"} aValue={"0"} stat={"scrum penalties"} />
        <HorizontalBar hValue={"1"} aValue={"0"} stat={"scrum steals"} />

        <RoundedBar
          hValue={8}
          aValue={11}
          hPercent={100}
          aPercent={73}
          stat={"lineout retention"}
          hTotal={11}
          aTotal={15}
        />

        <HorizontalBar hValue={"1"} aValue={"0"} stat={"lineout steals"} />
        <HorizontalBar hValue={"1"} aValue={"0"} stat={"successful mauls"} />
        <HorizontalBar hValue={"0"} aValue={"1"} stat={"unsuccessful mauls"} />
      </CardContent>
    </Card>
  );
};

export default RugbyTeamSetPiece;
