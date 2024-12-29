import React from "react";

import RugbyTeamHeader from "./rugby/rugby-header";
import RugbyTeamDefense from "./rugby/rugby-defense";

const RugbyTeamStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-3">
        <RugbyTeamHeader />
        <RugbyTeamDefense />
      </div>
    </div>
  );
};

export default RugbyTeamStats;
