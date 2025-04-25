"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { columns } from "./columns";
import Loading from "../../loading";
import { useStore } from "@/store/store";
import { Button } from "@/components/ui/button";
import { CompPlayersTable } from "./comp-player-table";
import { getTournamentTeams } from "@/actions/django-actions";
import { getAllPlayers, getTournaments } from "@/actions/php-actions";
import UploadTeamLogoModal from "@/components/tournaments/teams/upload-teamlogo-modal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TeamsPage = () => {
  const [seasons, setSeasons] = useState<CompSeason[]>([]);
  const { store, updateTeamId, updateSerie } = useStore((state) => state);

  const teamId = store.teamId;
  const tournId = store.tournament;

  const tourna = store.tournament as string;
  const serie = store.serie;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["teams", tourna, serie],
    queryFn: () => getTournamentTeams(tourna, serie),
  });

  const { data: tournaments, isLoading: tLoading } = useQuery({
    queryKey: ["userTournaments"],
    queryFn: () => getTournaments(),
  });

  const { data: players, isLoading: pLoading } = useQuery({
    queryKey: ["allPlayers", teamId],
    queryFn: () => getAllPlayers(teamId),
  });

  useEffect(() => {
    if (tournId && tournaments) {
      const tournament = tournaments.find(
        (tourn) => tourn.tournament_id === tournId
      );

      if (tournament) {
        const series: CompSeason[] = tournament.season;

        updateSerie(series[0].id);
        setSeasons(series);
      }
    }
  }, [tournaments, tournId]);

  useEffect(() => {
    if (data) {
      updateTeamId(data[0].id);
    }
  }, [data]);

  if (isLoading || tLoading) {
    return <Loading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const teams = data ? data : [];

  // console.log(store.teamId);
  // console.log(players);
  // console.log(tournaments);
  // console.log(seasons);

  return (
    <main className="space-y-2">
      <header className="bg-white shadow-md rounded-md">
        <div className="bg-gray-100 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3 gap-3">
              <h2 className="text-sm font-medium text-gray-600">
                {teams.length} teams in season 2024/2025
              </h2>
              <Select value={serie} onValueChange={updateSerie}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Filter season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {seasons.map((season) => (
                      <SelectItem key={season.id} value={season.id}>
                        {season.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-gray-50">
          <div className="flex flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="relative flex-shrink-0">
              <Image
                src="/homeLogo.png"
                alt={"name"}
                className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
                height={80}
                width={80}
              />

              <div className="absolute bottom-0 right-0">
                <UploadTeamLogoModal />
              </div>
            </div>

            <div className="flex-1 min-w-0 space-y-3">
              <Select value={teamId} onValueChange={updateTeamId}>
                <SelectTrigger className="w-full sm:w-[280px] bg-white">
                  <SelectValue placeholder="Filter team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <div className="flex items-center justify-between flex-wrap gap-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {players?.length} Players
                </h3>
                <Button variant="outline" className="shadow-sm">
                  Add Player
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="">
        {pLoading === true ? (
          <div className="flex items-center justify-center h-20">
            Loading...
          </div>
        ) : (
          <CompPlayersTable data={players as TeamPlayer[]} columns={columns} />
        )}
      </section>
    </main>
  );
};

export default TeamsPage;
