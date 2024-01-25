"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CompetionTeams = ({ competitions }: { competitions: Competition[] }) => {
  const [id, setId] = useState(competitions[0]?.id);

  const competition = competitions.find((comp) => comp.id === id);

  const handleSelectChange = (value: string) => {
    setId(value);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 border space-y-4">
        <div>
          <p className="text-sm">Filter tournament</p>
          <Select
            onValueChange={handleSelectChange}
            defaultValue={competitions[0]?.id}
          >
            <SelectTrigger>
              <SelectValue placeholder="select a team" />
            </SelectTrigger>

            <SelectContent>
              {competitions.map((comp) => (
                <SelectItem key={comp.id} value={comp.id}>
                  {comp.competition_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {competition && (
          <div className="grid grid-cols-3 border p-2">
            <h1 className="font-bold ">{competition.competition_name}</h1>
            <p>Type: {competition.competition_type}</p>
            <p>Starts on: {competition.start_period}</p>
            <p>Registered teams: {competition.teams.length}</p>
            <p>Categories: 3</p>
          </div>
        )}
      </div>

      <div className="space-y-2 border">
        <h1 className="px-4 pt-2">Registered Teams</h1>
        <div className="grid px-4 pt-2">
          {competition?.teams.map((comp) => (
            <div key={comp.id}>• {comp.team.team_name}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompetionTeams;
