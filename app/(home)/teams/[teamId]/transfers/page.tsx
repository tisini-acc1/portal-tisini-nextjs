import { Suspense } from "react";

import { columns } from "./columns";
import Loading from "@/app/(home)/loading";
import { TransferTable } from "./transfer-table";
import { getTeamTransfers } from "@/data/transfers/team-transfers";

type TransferProps = {
  params: Promise<{ teamId: string }>;
};

const TransfersPage = async ({ params }: TransferProps) => {
  const { teamId } = await params;

  const id = teamId.split("-").pop() || "";

  const transfers = await getTeamTransfers(id);

  return (
    <main>
      <section className="">
        <Suspense fallback={<Loading />}>
          <TransferTable
            data={transfers?.slice().reverse() as Transfer[]}
            columns={columns}
          />
        </Suspense>
      </section>
    </main>
  );
};

export default TransfersPage;
