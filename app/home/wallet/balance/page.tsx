"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { columns } from "./columns";
import { useStore } from "@/lib/store";
import { StatementTable } from "./statement-table";
import { getStatement } from "@/actions/wallet-actions";
import DepositModal from "@/components/wallet/deposit-modal";
import WithdrawalModal from "@/components/wallet/withdraw-modal";

const WalletPage = () => {
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [openDeposit, setOpenDeposit] = useState(false);

  const { store } = useStore((state) => state);

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

  return (
    <main className="space-y-4">
      <header className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          Wallet Balance
        </h1>
        <p className="text-3xl font-semibold text-green-500 mb-6">
          KSH. {store.balance}
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setOpenWithdraw(true)}
            className="px-4 py-2 bg-red-500 text-white font-medium rounded-md shadow hover:bg-red-600"
          >
            Withdraw
          </button>
          <button
            onClick={() => setOpenDeposit(true)}
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600"
          >
            Deposit
          </button>
        </div>
      </header>

      <section>
        <StatementTable data={data as WalletStatement[]} columns={columns} />
      </section>

      <WithdrawalModal open={openWithdraw} setOpen={setOpenWithdraw} />
      <DepositModal open={openDeposit} setOpen={setOpenDeposit} />
    </main>
  );
};

export default WalletPage;
