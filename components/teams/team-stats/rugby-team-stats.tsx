import React from "react";

import RugbyTeamHeader from "./rugby/rugby-header";
import RugbyTeamDefense from "./rugby/rugby-defense";
import RugbyTeamAttack from "./rugby/rugby-attack";
import RugbyTeamSetPiece from "./rugby/rugby-set-piece";
import RugbyTeamDiscipline from "./rugby/rugby-discipline";
import RugbyTeamRestarts from "./rugby/rugby-restart";

const RugbyTeamStats = () => {
  return (
    <section className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-4">
          <RugbyTeamHeader />
          <RugbyTeamDefense />
        </div>

        <div>
          <RugbyTeamAttack />
        </div>

        <div>
          <RugbyTeamSetPiece />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-4 space-y-4">
          <RugbyTeamDiscipline />
          <RugbyTeamRestarts />
        </div>
        <div className="col-span-8">zones & territory</div>
      </div>
    </section>
  );
};

export default RugbyTeamStats;
