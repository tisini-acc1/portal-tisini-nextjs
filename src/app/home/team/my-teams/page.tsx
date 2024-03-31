import Image from "next/image";

import { getMyTeams } from "@/lib/fetch-data/teams";
import { Card, CardContent } from "@/components/ui/card";
import AddTeamModal from "@/components/teams/my-teams/add-team-modal";

const MyTeamsPage = async () => {
  const teamsData: Promise<Team[]> = getMyTeams();
  const teams = await teamsData;

  return (
    <main>
      <div className="flex justify-between p-2 gap-3 border-b h-16">
        <AddTeamModal />
      </div>

      <section className="grid grid-cols-3 gap-4 p-2">
        {teams.map((team) => (
          <Card
            key={team.id}
            className="p-0 hover:bg-accent hover:cursor-pointer"
          >
            <CardContent className="flex items-center gap-2 p-2">
              <Image
                src="/logo-placeholder.png"
                alt=""
                width={70}
                height={70}
              />
              <div className="flex flex-col">
                <h1>{team.team_name}</h1>
                <p>{team.team_type}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
};

export default MyTeamsPage;
