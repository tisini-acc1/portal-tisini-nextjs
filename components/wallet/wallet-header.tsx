"use client";

import { useStore } from "@/lib/store";

const WalletHeader = () => {
  const { user } = useStore((state) => state);
  console.log(user);

  return (
    <header className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Wallet Balance</h1>
      <p className="text-3xl font-semibold text-green-500 mb-6">{"345.78"}</p>
      <div className="flex gap-4">
        <button className="px-4 py-2 bg-red-500 text-white font-medium rounded-md shadow hover:bg-red-600">
          Withdraw
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600">
          Deposit
        </button>
      </div>
    </header>
  );
};

export default WalletHeader;
