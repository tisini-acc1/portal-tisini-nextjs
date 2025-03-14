"use client";

import { useQuery } from "@tanstack/react-query";

import { columns } from "./columns";
import { useStore } from "@/lib/store";
import { OfficialsFixTable } from "./fixtures-table";
import { getRefreeFixtures } from "@/actions/php-actions";
import ProfilePage from "../profile/page";

const MatchOfficialsPage = () => {
  const { store } = useStore((state) => state);

  // const { data, isError, isLoading } = useQuery({
  //   queryKey: ["refreeFixtures", store.user.id],
  //   queryFn: () => getRefreeFixtures(store.user.id as string),
  // });

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error loading tournaments. Please try again later.</div>;
  // }

  // return (
  //   <main>
  //     <section>
  //       <OfficialsFixTable data={data as RefreeFix[]} columns={columns} />
  //     </section>
  //   </main>
  // );
  return <ProfilePage />;
};

export default MatchOfficialsPage;
