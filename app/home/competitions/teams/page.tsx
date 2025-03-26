"use client";

import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/lib/store";
import { getTournamentTeams } from "@/actions/django-actions";
import UploadTeamLogoModal from "@/components/tournaments/teams/upload-teamlogo-modal";
import { Button } from "@/components/ui/button";
import { CameraIcon } from "lucide-react";

const TeamsPage = () => {
  const [open, setOpen] = useState(false);
  const [team, setTeam] = useState<CompTeam>({} as CompTeam);
  const { store } = useStore((state) => state);

  const tourna = store.tournament as string;
  const serie = store.serie;

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
  // console.log(data);

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
            <div
              key={team.id}
              className="border rounded-md p-4 flex items-center gap-2 font-mono relative"
            >
              <Image
                src={"/homeLogo.png"}
                alt={team.name}
                height={80}
                width={80}
                className="object-contain"
              />
              {team.name}

              <div className="absolute bottom-1 right-1">
                <Button
                  size={"icon"}
                  variant={"outline"}
                  onClick={() => {
                    setOpen(true);
                    setTeam(team);
                  }}
                >
                  <CameraIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <UploadTeamLogoModal open={open} setOpen={setOpen} team={team} />
      </section>
    </main>
  );
};

export default TeamsPage;
