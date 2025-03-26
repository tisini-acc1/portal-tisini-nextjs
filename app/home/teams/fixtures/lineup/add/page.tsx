"use client";

import { useStore } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";

import { getAllPlayers } from "@/actions/php-actions";
import SelectRugbyLineup from "@/components/teams/lineups/select-rugby-lineup";
import SelectFootballLineup from "@/components/teams/lineups/select-football-lineup";

const AddLineupPage = () => {
  const { store } = useStore((state) => state);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["allPlayers", store.team.id],
    queryFn: () => getAllPlayers(store.team.id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading players. Please try again later.</div>;
  }

  const fixType = store.fixType;

  // console.log(fixType);

  return (
    <>
      {fixType === "football" ? (
        // <AddFootballLineup data={data as TeamPlayer[]} />
        <SelectFootballLineup
          data={data as TeamPlayer[]}
          fixId={store.userFix.id}
        />
      ) : (
        <SelectRugbyLineup
          data={data as TeamPlayer[]}
          fixId={store.userFix.id}
        />
        // <AddRugbyLineup data={data as TeamPlayer[]} fixId={store.userFix.id} />
      )}
    </>
  );
};

export default AddLineupPage;
