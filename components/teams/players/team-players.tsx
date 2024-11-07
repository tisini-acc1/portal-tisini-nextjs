"use client";

import { useEffect, useState } from "react";

import { columns } from "./columns";
import { PlayersTable } from "./players-table";
import TeamsHeader from "../shared/teams-header";
import CreatePlayerModal from "./create-player-modal";

const TeamPlayers = ({ teams }: { teams: Team[] }) => {
  const [id, setId] = useState(teams?.[0]?.id);
  const [players, setPlayers] = useState([]);

  const team = teams.find((team) => team.id === id);

  const onChange = (value: string) => {
    setId(value);
  };

  useEffect(() => {
    const getPlayers = async () => {
      const res = await fetch(`/api/players/${team?.id}`);
      const data = await res.json();
      setPlayers(data);
    };

    getPlayers();
  }, [id]);

  return (
    <main className="space-y-2">
      <TeamsHeader
        teams={teams}
        onChange={onChange}
        id={id}
        modal={<CreatePlayerModal teamId={id} />}
      />

      <section className="flex-grow">
        <PlayersTable columns={columns} data={players} />
      </section>
    </main>
  );
};

export default TeamPlayers;
