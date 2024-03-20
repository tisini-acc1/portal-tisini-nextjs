"use client";

import Image from "next/image";
import React, { ReactNode } from "react";

import SelectTeam from "./select-team";
import SelectSubteams from "./select-subteam";

type HeaderProps = {
  id: string;
  teams: Team[];
  modal?: ReactNode;
  onChange: (v: string) => void;
  onTeamChange: (v: string) => void;
};

const TeamsHeader = ({
  id,
  teams,
  modal,
  onTeamChange,
  onChange,
}: HeaderProps) => {
  const team = teams.find((team) => team.id === id) as Team;
  const subTeams = team?.children;

  return (
    <header className="flex flex-col md:flex-row gap-1">
      {teams.length > 1 && <SelectTeam teams={teams} onChange={onChange} />}

      <div className="flex w-full justify-between p-2 gap-3 border-b">
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
          <div className="flex justify-center flex-col">
            <h1 className="text-xl font-bold">{team.team_name}</h1>
            {subTeams?.length > 0 && (
              <SelectSubteams subteams={subTeams} onChange={onTeamChange} />
            )}
          </div>
        </div>

        {/* modal button to add new objects */}
        <div className="flex flex-col justify-end">
          {/* {title && url && <HeaderButton title={title} url={url} />} */}
          {modal && <div>{modal}</div>}
        </div>
      </div>
    </header>
  );
};

export default TeamsHeader;
