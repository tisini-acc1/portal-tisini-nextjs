import { getTeam } from "@/lib/fetch-data/teams";
import { columns } from "../components/columns";
import { PlayersTable } from "../components/players-table";
import { getAllPlayers } from "@/lib/fetch-data/players";
import TeamsHeader from "../../components/teams-header";

type ParamsProps = {
  params: {
    teamId: string;
  };
};

const TeamPlayersPage = async ({ params: { teamId } }: ParamsProps) => {
  const teamData: Promise<Team> = getTeam(teamId);
  const team = await teamData;

  const playersData: Promise<Player[]> = getAllPlayers(teamId);
  const players = await playersData;

  return (
    <main className="space-y-2">
      <TeamsHeader
        title="player"
        team={team}
        url="/home/teams/players/add-new"
      />

      <section className="">
        <PlayersTable columns={columns} data={players} />
      </section>
    </main>
  );
};

export default TeamPlayersPage;
