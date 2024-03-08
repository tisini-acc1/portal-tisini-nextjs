"use client";

import { useEffect, useState } from "react";

import TeamsHeader from "../teams-header";
import { columns } from "./columns";
import { PlayersTable } from "./players-table";

const TeamPlayers = ({ teams }: { teams: Team[] }) => {
  const [id, setId] = useState(teams?.[0]?.id);
  const [players, setPlayers] = useState([]);

  const team = teams.find((team) => team.id === id);

  useEffect(() => {
    const getPlayers = async () => {
      const res = await fetch(`/api/players/${team?.id}`);
      const data = await res.json();
      setPlayers(data);
    };

    if (team) getPlayers();
  }, [team]);

  return (
    <main className="space-y-2">
      <TeamsHeader
        title="player"
        team={team as Team}
        url={`/home/team/teams/players/${team?.id}/add-new`}
      />

      <section className="flex-grow">
        <PlayersTable columns={columns} data={players} />
      </section>
    </main>
  );
};

export default TeamPlayers;
