import React from "react";

import RugbyTeamZone from "./rugby/rugby-zone";
import TeamStatsHeader from "./team-stats-header";
import RugbyTeamAttack from "./rugby/rugby-attack";
import RugbyTeamDefense from "./rugby/rugby-defense";
import RugbyTeamRestarts from "./rugby/rugby-restart";
import RugbyTeamSetPiece from "./rugby/rugby-set-piece";
import RugbyTeamDiscipline from "./rugby/rugby-discipline";
import { calcRugbyTerritory } from "@/lib/utils";
import { rugbyData } from "@/actions/fix-data";

const RugbyTeamStats = ({ data }: { data: FixtureData }) => {
  const rData = rugbyData(data);

  const territory = calcRugbyTerritory(data["home"], data["away"]);

  console.log(data);
  console.log(rData);
  // console.log(territory);
  return (
    <section className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RugbyTeamDiscipline data={rData.discipline} />
        <RugbyTeamRestarts data={rData.restarts} />
        <RugbyTeamZone data={rData.zones} />
      </div>
    </section>
  );
};

export default RugbyTeamStats;
