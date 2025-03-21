import RoundedBar from "@/components/shared/charts/rounded-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FootballTeamDuel = ({ data }: { data: FootballDuels }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Duels</CardTitle>
      </CardHeader>

      <CardContent className="space-y-7">
        <RoundedBar
          hValue={data.aerial.home.value}
          aValue={data.aerial.away.value}
          hPercent={30}
          aPercent={23}
          stat={"Ariel Duels won"}
          hTotal={data.aerial.home.total}
          aTotal={data.aerial.away.total}
        />

        <RoundedBar
          hValue={data.ground.home.value}
          aValue={data.ground.away.value}
          hPercent={30}
          aPercent={23}
          stat={"Ariel Duels won"}
          hTotal={data.ground.home.total}
          aTotal={data.ground.away.total}
        />
      </CardContent>
    </Card>
  );
};

export default FootballTeamDuel;
