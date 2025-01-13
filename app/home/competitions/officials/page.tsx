"use client";

import { getOfficials } from "@/actions/php-actions";
import CreateOfficialsModal from "@/components/tournaments/officials/create-officials-modal";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

const MatchOfficialsPage = () => {
  const { data } = useQuery({
    queryKey: ["tournamentOfficials"],
    queryFn: () => getOfficials(),
  });

  console.log(data);

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
            <Card>
              <CardContent className="pt-2">
                {official.first_name} {official.last_name}
              </CardContent>
            </Card>
          ))}
      </section>
    </main>
  );
};

export default MatchOfficialsPage;
