import { FC } from "react";

import { useStore } from "@/lib/store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TeamProps {
  tournamentsData: TeamTournament[];
  seriesData: TeamSeason[];
}

const TeamSelectHeader: FC<TeamProps> = ({ tournamentsData, seriesData }) => {
  const { store, updateSerie, updateTournament } = useStore((state) => state);

  return (
    <header className="flex gap-4">
      <Select value={store.tournament} onValueChange={updateTournament}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select league" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Leagues</SelectLabel>
            {tournamentsData?.map((tournament) => (
              <SelectItem
                key={tournament.tournamentid}
                value={tournament.tournamentid}
              >
                {tournament.tournamentname}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select value={store.serie} onValueChange={updateSerie}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select season" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Seasons</SelectLabel>
            {seriesData?.map((serie) => (
              <SelectItem key={serie.id} value={serie.id}>
                {serie.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </header>
  );
};

export default TeamSelectHeader;
