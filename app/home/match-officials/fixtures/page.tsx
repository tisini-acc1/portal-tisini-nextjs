"use client";

import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/store/store";
import { getRefreeFixtures } from "@/actions/php-actions";
import { OfficialsFixTable } from "./fixtures-table";
import { columns } from "./columns";

const OfficialsFixturesPage = () => {
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

  // console.log(data);

  return (
    <main>
      <section>
        <OfficialsFixTable data={data as RefreeFix[]} columns={columns} />
      </section>
    </main>
  );
};

export default OfficialsFixturesPage;
