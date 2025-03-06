import { getEvent } from "@/lib/utils";
import HorizontalBar from "@/components/shared/horizontal-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BasketballGeneral = ({ home, away }: { home: Stats; away: Stats }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <HorizontalBar
          hValue={getEvent(home, "172").toString()}
          aValue={getEvent(away, "172").toString()}
          stat={"Assists"}
        />

        <HorizontalBar
          hValue={getEvent(home, "176").toString()}
          aValue={getEvent(away, "176").toString()}
          stat={"Turnovers"}
        />

        <HorizontalBar
          hValue={getEvent(home, "173").toString()}
          aValue={getEvent(away, "173").toString()}
          stat={"Steals"}
        />

        <HorizontalBar
          hValue={getEvent(home, "171").toString()}
          aValue={getEvent(away, "171").toString()}
          stat={"Blocks"}
        />
      </CardContent>
    </Card>
  );
};

export default BasketballGeneral;
