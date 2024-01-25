import { columns } from "./columns";
import { getAllComps } from "@/lib/fetch-data/competitions";
import { CompsTable } from "../components/my-comps/comps-table";
import MyCompsHeader from "../components/my-comps/my-comps-header";

const CompetitionsPage = async () => {
  const compsData: Promise<Competition[]> = getAllComps();
  const competitions = await compsData;

  console.log(competitions);

  return (
    <main className="space-y-4">
      <MyCompsHeader />

      <CompsTable data={competitions} columns={columns} />
    </main>
  );
};

export default CompetitionsPage;
