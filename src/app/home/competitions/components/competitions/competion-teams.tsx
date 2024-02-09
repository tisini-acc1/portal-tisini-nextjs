"use client";

import { useState } from "react";

import CompetionsHeader from "./comps-header";

const CompetionTeams = ({ competitions }: { competitions: Competition[] }) => {
  const [id, setId] = useState(competitions[0]?.id);

  const competition = competitions.find((comp) => comp.id === id);

  const onChange = (value: string) => {
    setId(value);
  };

  return (
    <div className="space-y-4">
      <CompetionsHeader
        allComps={competitions}
        onChange={onChange}
        competition={competition}
      />

      <div className="space-y-2 border">
        categories
      </div>
    </div>
  );
};

export default CompetionTeams;
