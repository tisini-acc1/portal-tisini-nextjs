"use client";

import { useQuery } from "@tanstack/react-query";

import { getOfficials } from "@/actions/php-actions";
import { Card, CardContent } from "@/components/ui/card";
import CreateOfficialsModal from "@/components/tournaments/officials/create-officials-modal";
import Image from "next/image";

const MatchOfficialsPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tournamentOfficials"],
    queryFn: () => getOfficials(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <span>Error</span>;
  }

  return (
    <main className="space-y-6">
      <header className="flex justify-between items-center">
        <p className="font-mono">{data?.length} Officials</p>
        <CreateOfficialsModal />
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data
          ?.slice()
          .reverse()
          .map((official) => (
            <Card key={official.id}>
              <CardContent className="p-2 flex gap-3 cursor-pointer">
                <Image
                  src={"/avatar.webp"}
                  alt={official.first_name}
                  width={70}
                  height={70}
                  className="object-contain rounded-sm"
                />

                <div className="flex flex-col">
                  <p>
                    {official.first_name} {official.last_name}
                  </p>
                  <p className="text-muted-foreground">level 4</p>
                  <p className="text-muted-foreground">Nakuru</p>
                </div>
              </CardContent>
            </Card>
          ))}
      </section>
    </main>
  );
};

export default MatchOfficialsPage;
