"use client";

import Image from "next/image";
import React, { ReactNode } from "react";

import SelectTeam from "./select-team";

type HeaderProps = {
  id: string;
  teams: Team[];
  modal?: ReactNode;
  onChange: (v: string) => void;
};

const TeamsHeader = ({ id, teams, modal, onChange }: HeaderProps) => {
  const team = teams.find((team) => team.id === id) as Team;

  return (
    <header className="flex w-full justify-between p-2 gap-3 border-b">
      <div className="flex gap-3">
        <div className="border rounded-md p-2">
          <Image
            src="/logo-placeholder.png"
            alt="team-logo"
            width={70}
            height={70}
            priority
          />
        </div>
        <div className="flex justify-center flex-col gap-2">
          {teams.length > 1 ? (
            <SelectTeam teams={teams} onChange={onChange} />
          ) : (
            <h1 className="text-xl font-bold">{team.team_name}</h1>
          )}

          <h1 className="text-sm text-muted-foreground font-semibold">
            {team.team_type}
          </h1>
        </div>
      </div>

      {/* modal button to add new objects */}
      <div className="flex flex-col justify-end">
        {/* {title && url && <HeaderButton title={title} url={url} />} */}
        {modal && <div>{modal}</div>}
      </div>
    </header>
  );
};

export default TeamsHeader;
