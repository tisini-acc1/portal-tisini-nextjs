import { getToken } from "@/actions/actions";
import apiService from "@/services/api-service";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TeamsPage = async () => {
  const token = await getToken();
  const data: Promise<CompTeam[]> = apiService.get(
    `/tournaments/${token}/1/series/14/teams/`
  );
  const seriesData: Promise<Serie[]> = apiService.get(
    `/tournaments/${token}/1/series/`
  );

  const teams = await data;
  const series = await seriesData;
  console.log("teams", teams);
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
