import RoundedBar from "@/components/shared/rounded-bar";
import HorizontalBar from "@/components/shared/horizontal-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RugbyTeamRestarts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Restarts</CardTitle>
      </CardHeader>

      <CardContent className="md:space-y-10 space-y-6 md:pt-4">
        <HorizontalBar hValue={"10"} aValue={"2"} stat={"Restarts won"} />
        <RoundedBar
          hValue={70}
          aValue={30}
          hPercent={73}
          aPercent={56}
          stat={"Restarts"}
          hTotal={85}
          aTotal={49}
        />
      </CardContent>
    </Card>
  );
};

export default RugbyTeamRestarts;
