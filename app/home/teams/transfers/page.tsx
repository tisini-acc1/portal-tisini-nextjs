"use client";

import { useQuery } from "@tanstack/react-query";

import { columns } from "./columns";
import { useStore } from "@/lib/store";
import { TransferTable } from "./transfer-table";
import { getTeamTransfers } from "@/actions/php-actions";

const TransfersPage = () => {
  const { user } = useStore((state) => state);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["teamTransfers", user.team],
    queryFn: () => getTeamTransfers(user.team),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  console.log(data);

  return (
    <main>
      <section className="">
        <TransferTable
          data={data?.slice().reverse() as Transfer[]}
          columns={columns}
        />
      </section>
    </main>
  );
};

export default TransfersPage;
