import React, { Suspense } from "react";

import { getTeamLineup } from "@/data/teams/team-lineup";
import { getAllPlayers } from "@/data/teams/team-player";
import TeamLineups from "../../../components/teams/lineups/team-lineups";

type LineupProps = {
  params: Promise<{ teamId: string; fixId: string }>;
};

const LineupsPage = async ({ params }: LineupProps) => {
  const { fixId, teamId } = await params;

  const id = teamId.split("-").pop() || "";

  const lineups = getTeamLineup(fixId, id);
  const players = getAllPlayers(id);

  return (
    <Suspense>
      <TeamLineups teamId={id} players={players} lineupData={lineups} />
    </Suspense>
  );
};

export default LineupsPage;
