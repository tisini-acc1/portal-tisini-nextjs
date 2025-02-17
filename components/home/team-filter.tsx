"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/lib/store";
import FilterLoader from "./filter-loader";
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

  const { store, updateTeam } = useStore((state) => state);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["myTeams", store.user.id],
    queryFn: () => getUserTeams(),
  });

  useEffect(() => {
    if (data?.length) {
      setTeams(data);
      setTeam(data[0]);
    }
  }, [data]);

  useEffect(() => {
    if (team) {
      updateTeam({ id: team.team_id, name: team.teamname });
    }
  }, [updateTeam, team]);

  const handleTeamChange = (teamId: string) => {
    const selectedTeam = teams.find((t) => t.team_id === teamId);
    if (selectedTeam) {
      setTeam(selectedTeam);
    }
  };

  if (isLoading) {
    return <FilterLoader />;
  }

  if (isError) {
    return <div></div>;
  }

  return (
    <div className="pr-4">
      {teams.length > 1 && (
        <Select onValueChange={handleTeamChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={team?.teamname || "Select team"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {teams?.map((team) => (
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
