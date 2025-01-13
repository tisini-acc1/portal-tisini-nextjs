"use client";

import { getTournamentTransfers } from "@/actions/php-actions";
import { useStore } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import { TournamentTransferTable } from "./transfers-table";
import { columns } from "./columns";

const TournamentTransfersPage = () => {
  const { user } = useStore((state) => state);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["tournamentTransfers", user.tournament],
    queryFn: () => getTournamentTransfers(user.tournament),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <main>
      <section className="">
        <TournamentTransferTable
          data={data?.slice().reverse() as Transfer[]}
          columns={columns}
        />
      </section>
    </main>
  );
};

export default TournamentTransfersPage;
