import Image from "next/image";
import HeaderButton from "./header-button";
import { getMyTeams } from "@/lib/fetch-data/teams";
import React from "react";

type Props = {
  modal?: React.ReactNode;
};

// const Header = async ({ title, url }: { url?: string; title?: string }) => {
const Header: React.FC<Props> = async ({ modal }) => {
  const teamsData: Promise<Team[]> = getMyTeams();
  const teams = await teamsData;

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
        <div className="flex justify-center flex-col">
          <h1 className="text-xl font-bold">{teams[0].team_name}</h1>
          <h4 className="text-sm text-muted-foreground">
            {teams[0].team_type}
          </h4>
        </div>
      </div>

      {/* modal button to add new objects */}
      <div className="flex flex-col justify-end">
        {/* {title && url && <HeaderButton title={title} url={url} />} */}
        {modal && <div>{modal}</div>}
      </div>
    </div>
  );
};

export default Header;
