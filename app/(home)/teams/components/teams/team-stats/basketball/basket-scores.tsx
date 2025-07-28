import { getSubEvent } from "@/lib/utils";
import RoundedBar from "@/components/shared/charts/rounded-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BasketballScores = ({ home, away }: { home: Stats; away: Stats }) => {
  const hTwoPoint =
    getSubEvent(home, "169", "434") + getSubEvent(home, "175", "445");
  const aTwoPoint =
    getSubEvent(away, "169", "434") + getSubEvent(away, "175", "445");

  const hThreePoint =
    getSubEvent(home, "169", "435") + getSubEvent(home, "175", "444");
  const aThreePoint =
    getSubEvent(away, "169", "435") + getSubEvent(away, "175", "444");

  const hFreeThrow =
    getSubEvent(home, "169", "436") + getSubEvent(home, "175", "446");
  const aFreeThrow =
    getSubEvent(away, "169", "436") + getSubEvent(away, "175", "446");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Goals</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <RoundedBar
          hValue={getSubEvent(home, "169", "434")}
          aValue={getSubEvent(away, "169", "434")}
          hPercent={43}
          aPercent={57}
          stat={"2 point"}
          hTotal={hTwoPoint}
          aTotal={aTwoPoint}
        />

        <RoundedBar
          hValue={getSubEvent(home, "169", "435")}
          aValue={getSubEvent(away, "169", "434")}
          hPercent={43}
          aPercent={57}
          stat={"3 point"}
          hTotal={hThreePoint}
          aTotal={aThreePoint}
        />

        <RoundedBar
          hValue={getSubEvent(home, "169", "436")}
          aValue={getSubEvent(away, "169", "436")}
          hPercent={43}
          aPercent={57}
          stat={"Free throw"}
          hTotal={hFreeThrow}
          aTotal={aFreeThrow}
        />
      </CardContent>
    </Card>
  );
};

export default BasketballScores;
