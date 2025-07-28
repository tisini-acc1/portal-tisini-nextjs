import React from "react";

import RugbyTeamZone from "./rugby/rugby-zone";
import TeamStatsHeader from "./team-stats-header";
import RugbyTeamAttack from "./rugby/rugby-attack";
import RugbyTeamDefense from "./rugby/rugby-defense";
import RugbyTeamRestarts from "./rugby/rugby-restart";
import RugbyTeamSetPiece from "./rugby/rugby-set-piece";
import RugbyTeamDiscipline from "./rugby/rugby-discipline";
import { calcRugbyTerritory, calcRugbyTerritory7s } from "@/lib/utils";
import { rugbyData, rugbyData7s } from "@/actions/fix-data";

type RugbyProps = {
  data: FixtureData;
  fixType: string;
};

const RugbyTeamStats = ({ data, fixType }: RugbyProps) => {
  const rData = fixType === "rugby7" ? rugbyData7s(data) : rugbyData(data);

  const territory =
    fixType === "rugby7"
      ? calcRugbyTerritory7s(data["home"], data["away"])
      : calcRugbyTerritory(data["home"], data["away"]);

  // console.log(fixType);
  // console.log(data);
  // console.log(territory);
  return (
    <section className="grid gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <TeamStatsHeader
            details={rData.details}
            territory={territory}
            rugby={true}
          />
          <RugbyTeamDefense data={rData.defense} />
        </div>

        <div className="space-y-4">
          <RugbyTeamAttack data={rData.attack} />
        </div>

        <div className="space-y-4">
          <RugbyTeamSetPiece data={rData.setPiece} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RugbyTeamDiscipline data={rData.discipline} />
        <RugbyTeamRestarts data={rData.restarts} />
        <RugbyTeamZone data={rData.zones} />
      </div>
    </section>
  );
};

export default RugbyTeamStats;
