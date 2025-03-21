import RoundedBar from "@/components/shared/charts/rounded-bar";
import HorizontalBar from "@/components/shared/charts/horizontal-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RugbyTeamSetPiece = ({ data }: { data: RugbySetPiece }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Pieces</CardTitle>
      </CardHeader>

      <CardContent className="space-y-7">
        <HorizontalBar
          hValue={data.setPieceWon.home.toString()}
          aValue={data.setPieceWon.away.toString()}
          stat={"set pieces won"}
        />

        <RoundedBar
          hValue={data.scrumRetention.home.value}
          aValue={data.scrumRetention.away.value}
          hPercent={100}
          aPercent={100}
          stat={"scrum retention"}
          hTotal={data.scrumRetention.home.total}
          aTotal={data.scrumRetention.away.total}
        />
        <HorizontalBar
          hValue={data.scrumPenalty.home.toString()}
          aValue={data.scrumPenalty.away.toString()}
          stat={"scrum penalties"}
        />
        <HorizontalBar
          hValue={data.scrumSteal.home.toString()}
          aValue={data.scrumSteal.away.toString()}
          stat={"scrum steals"}
        />

        <RoundedBar
          hValue={data.lineoutRetention.home.value}
          aValue={data.lineoutRetention.away.value}
          hPercent={100}
          aPercent={73}
          stat={"lineout retention"}
          hTotal={data.lineoutRetention.home.total}
          aTotal={data.lineoutRetention.away.total}
        />

        <HorizontalBar
          hValue={data.lineoutSteal.home.toString()}
          aValue={data.lineoutSteal.away.toString()}
          stat={"lineout steals"}
        />
        <HorizontalBar
          hValue={data.successfulMaul.home.toString()}
          aValue={data.successfulMaul.away.toString()}
          stat={"successful mauls"}
        />
        <HorizontalBar
          hValue={data.unsuccessfulMaul.home.toString()}
          aValue={data.unsuccessfulMaul.away.toString()}
          stat={"unsuccessful mauls"}
        />
      </CardContent>
    </Card>
  );
};

export default RugbyTeamSetPiece;
