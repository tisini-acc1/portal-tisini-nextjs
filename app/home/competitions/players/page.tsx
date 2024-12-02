import { PlayersTable } from "@/components/tournaments/players/players-table";
import { getPlayers } from "@/lib/actions/django.actions";
import { columns } from "./columns";

const PlayersPage = async () => {
  const data: Promise<Player[]> = getPlayers(1);
  const players = await data;

  return (
    <main>
      <PlayersTable columns={columns} data={players} />
    </main>
  );
};

export default PlayersPage;
