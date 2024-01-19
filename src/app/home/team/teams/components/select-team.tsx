import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyTeams } from "@/lib/fetch-data/teams";
import Image from "next/image";
import TeamsCard from "./teams-card";

const SelectTeam = async ({ path }: { path: string }) => {
  const teamsData: Promise<Team[]> = getMyTeams();
  const teams = await teamsData;

  return (
    <div className="flex flex-col">
      <h1>Please select a team</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 ">
        {teams.map((team) => (
          <TeamsCard key={team.id} team={team} path={path} />
        ))}
      </div>
    </div>
  );
};

export default SelectTeam;
