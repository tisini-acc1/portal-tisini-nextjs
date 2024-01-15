import { getAllPlayers } from "@/lib/fetch-data/players";
import Header from "../../components/header";
import { columns } from "./components/columns";
import { PlayersTable } from "./components/players-table";
import { getMyTeams } from "@/lib/fetch-data/teams";

const PlayersPage = async () => {
  const teamsData: Promise<Team[]> = getMyTeams();
  const team = await teamsData;

  const teamId = team[0].id;

  const playersData: Promise<Player[]> = getAllPlayers(teamId);
  const players = await playersData;

  // console.log(players);

  return (
    <main className="space-y-2">
      <Header title="player" url="/home/team/players/add-new" />

      <section className="">
        <PlayersTable columns={columns} data={players} />
      </section>
    </main>
  );
};

export default PlayersPage;
