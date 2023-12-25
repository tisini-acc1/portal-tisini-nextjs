import { getAllPlayers } from "@/lib/fetch-data/players";
import Header from "../../components/header";
import { columns } from "./components/columns";
import { PlayersTable } from "./components/players-table";

const teamId: string = "0efeb67f-cfdf-4f1d-b3b0-56177b19b9c8";

const PlayersPage = async () => {
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
