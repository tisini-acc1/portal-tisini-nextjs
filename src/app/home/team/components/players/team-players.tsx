"use client";

import { useEffect, useState } from "react";

import { columns } from "./columns";
import { PlayersTable } from "./players-table";
import TeamsHeader from "../shared/teams-header";
import HeaderButton from "../shared/header-button";
import CreatePlayerModal from "./create-player-modal";

const TeamPlayers = ({ teams }: { teams: Team[] }) => {
  const [id, setId] = useState(teams?.[0]?.id);
  const [teamId, setTeamId] = useState("");
  const [players, setPlayers] = useState([]);

  const team = teams.find((team) => team.id === id);

  const onChange = (value: string) => {
    setId(value);
    setTeamId("");
  };

  const onTeamChange = (value: string) => {
    setTeamId(value);
  };

  useEffect(() => {
    const parentId = teamId != "" ? teamId : id;

    const getPlayers = async () => {
      const res = await fetch(`/api/players/${parentId}`);
      const data = await res.json();
      setPlayers(data);
    };

    if (parentId) getPlayers();
  }, [id, teamId]);

  return (
    <main className="space-y-2">
      <TeamsHeader
        teams={teams}
        onChange={onChange}
        id={id}
        onTeamChange={onTeamChange}
        modal={<CreatePlayerModal teamId={id} />}
      />

      <section className="flex-grow">
        <PlayersTable columns={columns} data={players} />
      </section>
    </main>
  );
};

export default TeamPlayers;
