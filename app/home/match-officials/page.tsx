"use client";

import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/lib/store";
import { columns } from "./fixtures/columns";
import { getRefreeFixtures } from "@/actions/php-actions";
import { OfficialsFixTable } from "./fixtures/fixtures-table";

const MatchOfficialsPage = () => {
  const { store } = useStore((state) => state);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["refreeFixtures", store.user.id],
    queryFn: () => getRefreeFixtures(store.user.id as string),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading tournaments. Please try again later.</div>;
  }

  const fixtures = data?.slice().reverse();

  return (
    <main>
      <section>
        <OfficialsFixTable data={fixtures as RefreeFix[]} columns={columns} />
      </section>
    </main>
  );
};

export default MatchOfficialsPage;
