import RoundedBar from "@/components/shared/rounded-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FootballTeamDuel = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Duels</CardTitle>
      </CardHeader>

      <CardContent className="space-y-7">
        <RoundedBar
          hValue={5}
          aValue={6}
          hPercent={30}
          aPercent={23}
          stat={"Ariel Duels"}
        />

        <RoundedBar
          hValue={5}
          aValue={6}
          hPercent={30}
          aPercent={23}
          stat={"Ground Duels"}
        />
      </CardContent>
    </Card>
  );
};

export default FootballTeamDuel;
