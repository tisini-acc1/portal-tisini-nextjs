import { columns } from "./columns";
import { getAllComps } from "@/lib/fetch-data/competitions";
import { CompsTable } from "../components/admin/comps-table";
import CreateTournamentDialog from "../components/admin/create-tournament-dialog";

const CompetitionsPage = async () => {
  const compsData: Promise<Competition[]> = getAllComps();
  const competitions = await compsData;

  return (
    <main className="space-y-4">
      <header className="border-b p-3 h-16">
        <div className="float-right">
          <CreateTournamentDialog />
        </div>
      </header>

      <CompsTable data={competitions.data} columns={columns} />
    </main>
  );
};

export default CompetitionsPage;
