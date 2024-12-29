import React from "react";

import RugbyTeamZone from "./rugby/rugby-zone";
import TeamStatsHeader from "./team-stats-header";
import RugbyTeamAttack from "./rugby/rugby-attack";
import RugbyTeamDefense from "./rugby/rugby-defense";
import RugbyTeamRestarts from "./rugby/rugby-restart";
import RugbyTeamSetPiece from "./rugby/rugby-set-piece";
import RugbyTeamDiscipline from "./rugby/rugby-discipline";

const RugbyTeamStats = ({ data }: { data: SingleFixtureStats }) => {
  const scores = data["scores"];
  const details = data["fixture"][0];
  // const home = data["home"];

  return (
    <section className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <TeamStatsHeader scores={scores} details={details} rugby={true} />
          <RugbyTeamDefense />
        </div>

        <div className="space-y-4">
          <RugbyTeamAttack />
        </div>

        <div className="space-y-4">
          <RugbyTeamSetPiece />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-full md:col-span-4 space-y-4">
          <RugbyTeamDiscipline />
          <RugbyTeamRestarts />
        </div>
        <div className="col-span-full md:col-span-8">
          <RugbyTeamZone />
        </div>
      </div>
    </section>
  );
};

export default RugbyTeamStats;
