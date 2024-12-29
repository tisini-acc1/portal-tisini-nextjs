import React from "react";

import RugbyTeamHeader from "./rugby/rugby-header";
import RugbyTeamDefense from "./rugby/rugby-defense";
import RugbyTeamAttack from "./rugby/rugby-attack";
import RugbyTeamSetPiece from "./rugby/rugby-set-piece";

const RugbyTeamStats = () => {
  return (
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
  );
};

export default RugbyTeamStats;
