"use client";

import { PlayersTable } from "@/components/tournaments/players/players-table";
import { getPlayers } from "@/actions/django-actions";
import { columns } from "./columns";
import FilterTournTeams from "@/components/tournaments/filter-tourn-teams";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/lib/store";

const PlayersPage = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  const { user } = useStore((state) => state);

  const { data } = useQuery({
    queryKey: ["teamPlayers", user.team],
    queryFn: () => getPlayers(user.team),
  });

  useEffect(() => {
    if (data) {
      const playersData = data.filter((item) => item.status === "1");
      setPlayers(playersData);
    }
  }, [data]);

  // if (!data && isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>No Players for selected team</div>;
  // }

  return (
    <main>
      <div className="flex justify-end">
        <FilterTournTeams />
      </div>
      <PlayersTable columns={columns} data={players} />
    </main>
  );
};

export default PlayersPage;
