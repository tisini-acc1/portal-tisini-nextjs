import RoundedBar from "@/components/shared/rounded-bar";
import StatsRow from "@/components/shared/stats-row";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const RugbyTeamSetPiece = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Pieces</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <StatsRow hValue={"13"} aValue={"18"} stat={"set pieces won"} />
        <RoundedBar
          hValue={4}
          aValue={10}
          hPercent={100}
          aPercent={100}
          stat={"scrum retention"}
        />
        <StatsRow hValue={"1"} aValue={"0"} stat={"scrum penalties"} />
        <StatsRow hValue={"1"} aValue={"0"} stat={"scrum steals"} />
        <RoundedBar
          hValue={8}
          aValue={11}
          hPercent={100}
          aPercent={73}
          stat={"lineout retention"}
        />
        <StatsRow hValue={"1"} aValue={"0"} stat={"lineout steals"} />
        <StatsRow hValue={"1"} aValue={"0"} stat={"successful mauls"} />
        <StatsRow hValue={"0"} aValue={"1"} stat={"unsuccessful mauls"} />
      </CardContent>
    </Card>
  );
};

export default RugbyTeamSetPiece;
