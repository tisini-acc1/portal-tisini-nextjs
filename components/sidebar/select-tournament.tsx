"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import tournamentService from "@/services/tournament.service";

const SelectTournament = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["tournaments"],
    queryFn: tournamentService.getTournaments,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const tournaments = data?.data as Competition[];

  return (
    <Select>
      <SelectTrigger className="mt-2">
        <SelectValue placeholder={tournaments[0].tournament_id} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {tournaments.map((tournament) => (
            <SelectItem
              key={tournament.tournament_id}
              value={tournament.tournament_id}
            >
              {tournament.tournament_id}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectTournament;
