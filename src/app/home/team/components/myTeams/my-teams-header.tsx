"use client";

import Image from "next/image";

import SelectTeam from "../shared/select-team";
import HeaderButton from "../shared/header-button";

type HeaderProps = {
  url?: string;
  title?: string;
  modal?: React.ReactNode;
  onChange: (v: string) => void;
  teams: Team[];
};

const MyTeamsHeader = ({ title, url, modal, teams, onChange }: HeaderProps) => {
  return (
    <div className="flex justify-between p-2 gap-3 border-b">
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
          <SelectTeam teams={teams} onChange={onChange} />

          <h4 className="text-sm text-muted-foreground">
            {teams[0].team_type}
          </h4>
        </div>
      </div>

      {/* modal button to add new objects */}
      <div className="flex flex-col justify-end">
        {title && url && <HeaderButton title={title} url={url} />}
        {modal && <div>{modal}</div>}
      </div>
    </div>
  );
};

export default MyTeamsHeader;
