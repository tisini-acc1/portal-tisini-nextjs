"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Loading from "../../loading";
import { useStore } from "@/store/store";
import { StatsTable } from "@/components/tournaments/stats/stats-table";
import { cardsColumns } from "@/components/tournaments/stats/cards-columns";
import { pointsColumns } from "@/components/tournaments/stats/points-columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ballPointsColumns } from "@/components/tournaments/stats/ball-point-columns";
import {
  getSeasonCards,
  getSeasonScorers,
  getTournaments,
} from "@/actions/php-actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TournamentStatsPage = () => {
  const [seasons, setSeasons] = useState<CompSeason[]>([]);

  const { updateSerie } = useStore((state) => state);
  const tournId = useStore((state) => state.store.tournament);
  const serieId = useStore((state) => state.store.serie);
  const fixType = useStore((state) => state.store.fixType);

  const {
    data: tournaments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userTournaments"],
    queryFn: () => getTournaments(),
  });

  const {
    data: scorers,
    isLoading: sLoading,
    isError: sError,
  } = useQuery({
    queryKey: ["topscorers", serieId],
    queryFn: () => getSeasonScorers(parseInt(serieId), fixType),
  });

  const {
    data: cards,
    isLoading: cLoading,
    isError: cError,
  } = useQuery({
    queryKey: ["topCards", serieId],
    queryFn: () => getSeasonCards(parseInt(serieId), fixType),
  });

  useEffect(() => {
    if (tournId && tournaments) {
      const tournament = tournaments.find(
        (tourn) => tourn.tournament_id === tournId
      );

      if (tournament) {
        const series: CompSeason[] = tournament.season;
        setSeasons(series);

        if (series.some((s) => s.id === serieId)) {
          updateSerie(serieId);
        } else {
          updateSerie(series[0].id);
        }
      }
    }
  }, [tournaments, serieId, tournId]);

  const columns = fixType === "football" ? ballPointsColumns : pointsColumns;

  if (sLoading || isLoading || cLoading) {
    return <Loading />;
  }

  if (isError || cError || sError) {
    return <div>Error!</div>;
  }

  return (
    <main className="space-y-4">
      <Tabs defaultValue="points">
        <header className="bg-white shadow-md rounded-md">
          <div className="bg-gray-100 border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-end py-3 gap-3">
                <Select value={serieId} onValueChange={updateSerie}>
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

          <div className="p-1">
            <TabsList>
              <TabsTrigger value="points">Points</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
            </TabsList>
          </div>
        </header>

        <section>
          <TabsContent value="points">
            <StatsTable columns={columns} data={scorers as TopScorer[]} />
          </TabsContent>
          <TabsContent value="cards">
            <StatsTable columns={cardsColumns} data={cards as TopCards[]} />
          </TabsContent>
        </section>
      </Tabs>
    </main>
  );
};

export default TournamentStatsPage;
