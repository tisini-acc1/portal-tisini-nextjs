import { Fixtures } from "@/components/teams/fixtures/fixtures";
import { getAllComps } from "@/lib/fetch-data/competitions";
import { getMyTeams, getTeam } from "@/lib/fetch-data/teams";
import React from "react";

const FixturesPage = async () => {
  const TeamsData: Promise<Team[]> = getMyTeams();
  const teams = await TeamsData;

  const CompsData: Promise<Competition> = getAllComps();
  const comps = await CompsData;

  return <Fixtures comps={comps} teams={teams} />;
};

export default FixturesPage;
