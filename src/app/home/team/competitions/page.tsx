import { getAllComps } from "@/lib/fetch-data/competitions";
import { RegToComp } from "@/components/teams/competitions/reg-to-comp";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CompetitionsPage = async () => {
  const compsData: Promise<Competition> = getAllComps();
  const competitions = await compsData;

  return (
    <main>
      <h1 className="text-xl">Available Competitions to register</h1>

      <section className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Competition</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Teams</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {competitions.data.map((comp) => (
              <TableRow key={comp.id}>
                <TableCell>{comp.competition_name}</TableCell>
                <TableCell>{comp.competition_type}</TableCell>
                <TableCell>{comp.season}</TableCell>
                <TableCell>{comp.teams.length}</TableCell>
                <TableCell>
                  <RegToComp comp={comp} teams={[]} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
};

export default CompetitionsPage;
