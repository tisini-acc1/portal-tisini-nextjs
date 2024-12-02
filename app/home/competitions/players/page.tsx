import { PlayersTable } from "@/components/tournaments/players/players-table";
import { getPlayers, getTournamentTeams } from "@/actions/django-actions";
import { columns } from "./columns";
import FilterTournTeams from "@/components/tournaments/filter-tourn-teams";

const PlayersPage = async () => {
  const players = await getPlayers(1);
  const teams = await getTournamentTeams(1, 14);

  return (
    <main>
      <div className="flex justify-end">
        <FilterTournTeams teams={teams} />
      </div>
      <PlayersTable columns={columns} data={players} />
    </main>
  );
};

export default PlayersPage;
