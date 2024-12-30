import RoundedBar from "@/components/shared/rounded-bar";
import HorizontalBar from "@/components/shared/horizontal-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RugbyTeamDefense = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Defense</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <HorizontalBar hValue={"19"} aValue={"70"} stat={"negative tackles"} />
        <HorizontalBar hValue={"27"} aValue={"20"} stat={"positive tackles"} />

        <RoundedBar
          hValue={46}
          aValue={48}
          hPercent={87}
          aPercent={88}
          stat={"successful tackles"}
          hTotal={50}
          aTotal={50}
        />
        <HorizontalBar hValue={"6"} aValue={"13"} stat={"missed tackles"} />
        <HorizontalBar hValue={"8"} aValue={"6"} stat={"turnovers won"} />
      </CardContent>
    </Card>
  );
};

export default RugbyTeamDefense;
