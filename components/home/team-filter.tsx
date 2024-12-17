"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/lib/store";
import { getUserTeams } from "@/actions/php-actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const TeamFilter = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [team, setTeam] = useState<Team>();

  const { updateTeam } = useStore((state) => state);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["myTeams"],
    queryFn: () => getUserTeams(),
  });

  useEffect(() => {
    if (data) {
      setTeams(data);
      setTeam(data[0]);
    }
  }, [data]);

  useEffect(() => {
    if (team) {
      updateTeam(team.team_id);
    }
  }, [team, updateTeam]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div></div>;
  }

  return (
    <div className="pr-4">
      {teams.length > 1 && (
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={team?.teamname || "Select team"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {teams.map((team) => (
                <SelectItem key={team.team_id} value={team.team_id}>
                  {team.teamname}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default TeamFilter;
