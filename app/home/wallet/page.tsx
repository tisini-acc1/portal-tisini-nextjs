"use client";

import { getStatement } from "@/actions/wallet-actions";
import WalletHeader from "@/components/wallet/wallet-header";
import { StatementTable } from "./statement-table";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";

const WalletPage = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["statements"],
    queryFn: () => getStatement(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  console.log(data);
  return (
    <main className="space-y-4">
      <WalletHeader />

      <section>
        <StatementTable data={data as WalletStatement[]} columns={columns} />
      </section>
    </main>
  );
};

export default WalletPage;
