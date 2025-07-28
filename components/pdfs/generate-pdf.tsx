"use client";

import React from "react";

import SimpleBallPDF from "./simple-pdf";
import { useStore } from "@/store/store";
import { footballData } from "@/actions/fix-data";
import { getEvent, getSubEvent } from "@/lib/utils";
import { passSequenceAnalysis } from "@/lib/pass-sequence";
import {
  BallWon,
  GkRestart,
} from "../../app/(home)/teams/components/teams/team-stats/football-team-stats";

type TeamProps = {
  data: FixtureData;
  videoData: VideoEvent[];
};

const GenFootballPDF = ({ data, videoData }: TeamProps) => {
  const ballWon = {} as BallWon;
  const restart = {} as GkRestart;

  const fData = footballData(data);

  const home = data.home;
  const away = data.away;

  ballWon["ownHalf"] = {
    home: getSubEvent(data.home, "204", "478"),
    away: getSubEvent(data.away, "204", "478"),
  };

  ballWon["oppHalf"] = {
    home: getSubEvent(data.home, "204", "479"),
    away: getSubEvent(data.away, "204", "479"),
  };

  restart["comp"] = {
    home:
      getSubEvent(home, "142", "307") +
      getSubEvent(home, "68", "77") +
      getSubEvent(home, "167", "428") +
      getSubEvent(home, "168", "429") +
      getSubEvent(home, "216", "522"),
    away:
      getSubEvent(away, "142", "307") +
      getSubEvent(away, "68", "77") +
      getSubEvent(away, "167", "428") +
      getSubEvent(away, "168", "429") +
      getSubEvent(away, "216", "523"),
  };

  restart["total"] = {
    home:
      getEvent(home, "142") +
      getEvent(home, "68") +
      getEvent(home, "167") +
      getEvent(home, "168"),
    away:
      getEvent(away, "142") +
      getEvent(away, "68") +
      getEvent(away, "167") +
      getEvent(away, "168"),
  };

  const teamId = useStore((state) => state.store.team.id);

  const teamEvents = videoData.filter((item) => item.team === teamId);

  const sequences = passSequenceAnalysis(teamEvents);

  return (
    // <PDFViewer width={"100%"} height={"100%"}>
    <SimpleBallPDF
      restarts={restart}
      recovery={ballWon}
      sequences={sequences}
      data={fData}
    />
    // </PDFViewer>
  );
};

export default GenFootballPDF;
