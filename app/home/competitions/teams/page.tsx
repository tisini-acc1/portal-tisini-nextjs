import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getTournamentSeries,
  getTournamentTeams,
} from "@/lib/actions/django.actions";

const TeamsPage = async () => {
  const teamData = getTournamentTeams(1, 14);
  const seriesData = getTournamentSeries(1);

  const teams = await teamData;
  const series = await seriesData;

  return (
    <main>
      <header className="flex justify-end mb-4">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter season" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {series.map((serie) => (
                <SelectItem key={serie.id} value="apple">
                  {serie.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </header>

      <section className="space-y-4">
        <h2 className="">{teams.length} teams in season 2024/2025</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {teams.map((team) => (
            <div key={team.id} className="border rounded-md p-4">
              {team.name}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default TeamsPage;
