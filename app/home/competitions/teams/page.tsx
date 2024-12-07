"use client";

import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/lib/store";
import { getTournamentTeams } from "@/actions/django-actions";

const TeamsPage = () => {
  const { user } = useStore((state) => state);

  const tourna = user.tournament as string;
  const serie = user.series;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["teams", tourna, serie],
    queryFn: () => getTournamentTeams(tourna, serie),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const teams = data ? data : [];

  return (
    <main>
      <header className="flex justify-end mb-4">
        {/* <Select>
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
        </Select> */}
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
