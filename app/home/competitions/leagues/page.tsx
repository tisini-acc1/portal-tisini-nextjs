"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/lib/store";
import { getTournaments } from "@/actions/django-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreVertical } from "lucide-react";
import CreateTournamentModal from "@/components/tournaments/leagues/create-tournament-modal";

const CompetitionsPage = () => {
  const [tournament, setTournament] = useState<Tournament | undefined>(
    undefined
  );
  const [serie, setSerie] = useState<Serie | undefined>();

  const { user } = useStore((state) => state);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tournaments"],
    queryFn: () => getTournaments(),
  });

  useEffect(() => {
    if (data && user.tournament && user.series) {
      const tourna = data.find(
        (tournament) => tournament.id === user.tournament
      );
      setTournament(tourna as Tournament);
      if (tourna) {
        const series = tourna.series.find((serie) => serie.id === user.series);
        setSerie(series);
      }
    }
  }, [user.tournament, user.series, data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>error</div>;
  }
  console.log(data);
  return (
    <main className="space-y-4">
      <header className="border-b p-3 h-16">
        <div className="float-right">
          <CreateTournamentModal />
        </div>
      </header>

      <section className="space-y-8">
        <Card>
          <CardHeader className="bg-gray-50">
            <CardTitle className="flex justify-between">
              {tournament?.name}
              <MoreVertical />
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 grid-cols-1">
            <Image
              src={"/tournament-img.jpg"}
              alt=""
              width={550}
              height={350}
            />

            <div className="space-y-6 p-2">
              <div>
                <strong>Starts on:</strong>
                <p>{tournament?.date_from}</p>
              </div>

              <div>
                <strong>Ends on:</strong>
                <p>{tournament?.date_from}</p>
              </div>

              <div>
                <strong>Seasons:</strong>
                <p>{tournament?.series.length}</p>
              </div>

              <div>
                <strong>Roles:</strong>
                <p>{"Chair person"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default CompetitionsPage;
