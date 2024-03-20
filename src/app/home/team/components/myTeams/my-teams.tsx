"use client";

import { useState } from "react";
import AddTeamModal from "./add-team-modal";
import MyTeamsHeader from "./my-teams-header";
import SubsetTeams from "./subset-teams";

const MyTeams = ({ teams }: { teams: Team[] }) => {
  const [id, setId] = useState(teams?.[0].id);

  const onChange = (value: string) => {
    setId(value);
  };

  const team = teams.find((team) => team.id === id) as Team;

  return (
    <main>
      <MyTeamsHeader
        teams={teams}
        onChange={onChange}
        modal={<AddTeamModal team={team} />}
      />

      <section className="m-2 mt-4">
        <h2 className="font-semibold">Subset teams under {team.team_name}</h2>

        <SubsetTeams subsetTeams={team?.children} />
      </section>
    </main>
  );
};

export default MyTeams;
