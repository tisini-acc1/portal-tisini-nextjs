"use client";

import { getRefreeFixtures } from "@/actions/php-actions";
import { OfficialsFixTable } from "./fixtures-table";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/lib/store";

const MatchOfficialsPage = () => {
  const { user } = useStore((state) => state);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["refreeFixtures", user.user],
    queryFn: () => getRefreeFixtures(user.user as string),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading tournaments. Please try again later.</div>;
  }

  return (
    <main>
      <section>
        <OfficialsFixTable data={data as RefreeFix[]} columns={columns} />
      </section>
    </main>
  );
};

export default MatchOfficialsPage;
