import RoundedBar from "@/components/shared/charts/rounded-bar";
import HorizontalBar from "@/components/shared/charts/horizontal-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RugbyTeamRestarts = ({ data }: { data: RugbyRestarts }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Restarts</CardTitle>
      </CardHeader>

      <CardContent className="md:space-y-10 space-y-6 md:pt-4">
        <HorizontalBar
          hValue={data.restarts.home.toString()}
          aValue={data.restarts.away.toString()}
          stat={"Restarts won"}
        />
        <RoundedBar
          hValue={data.restartsRetention.home.value}
          aValue={data.restartsRetention.away.value}
          hPercent={73}
          aPercent={56}
          stat={"Restarts"}
          hTotal={data.restartsRetention.home.total}
          aTotal={data.restartsRetention.away.total}
        />
      </CardContent>
    </Card>
  );
};

export default RugbyTeamRestarts;
