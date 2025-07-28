import React from "react";

import { getTeamTournaments } from "@/data/teams/team-tournaments";
import TeamFixtures from "../../components/teams/fixtures/team-fixtures";

type FixProps = {
  params: Promise<{ teamId: string }>;
};

const FixturesPage = async ({ params }: FixProps) => {
  const { teamId } = await params;

  const id = teamId.split("-").pop() || "";

  const promiseData = getTeamTournaments(id, "");

  return <TeamFixtures promiseData={promiseData} />;
};

export default FixturesPage;
