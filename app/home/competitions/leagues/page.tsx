"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/lib/store";
import { getTournaments } from "@/actions/django-actions";

const CompetitionsPage = () => {
  const [tournament, setTournament] = useState<string>("");
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
      setTournament(tourna?.name as string);
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

  return (
    <main className="space-y-4">
      <header className="border-b p-3 h-16">
        <div className="float-right">{/* <CreateTournamentDialog /> */}</div>
      </header>

      <section className="space-y-8">
        <div className="flex">
          <Image src={"/tournament-img.jpg"} alt="" width={550} height={350} />
          <div className="flex items-center justify-center">
            <h2>{tournament}</h2>
            <p>{serie?.number_of_teams}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CompetitionsPage;
