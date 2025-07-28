import { FC, useEffect, useState } from "react";

import { useTeamStore } from "@/store/team.store";
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
}

const TeamSelectHeader: FC<TeamProps> = ({ tournamentsData }) => {
  const [series, setSeries] = useState<TeamSeason[]>([]);
  const { store, updateSerie, updateTournament } = useTeamStore(
    (state) => state
  );

  useEffect(() => {
    if (store.tournament) {
      const tourn = tournamentsData.find(
        (tournament) => tournament.tournamentid === store.tournament
      );

      if (tourn) {
        setSeries(tourn.season);
        updateSerie(tourn.season[0].id);
      }
    }
  }, [tournamentsData, store.tournament]);

  // console.log(store.tournament);
  // console.log(tournamentsData);
  // console.log(tournaments);
  // console.log(seriesData);

  return (
    <header className="flex justify-end gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg">
      <Select value={store.tournament} onValueChange={updateTournament}>
        <SelectTrigger className="w-[180px] bg-white dark:bg-gray-700">
          <SelectValue placeholder="Select league" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-700">
          <SelectGroup>
            <SelectLabel className="dark:text-gray-300">Leagues</SelectLabel>
            {tournamentsData?.map((tournament) => (
              <SelectItem
                key={tournament.tournamentid}
                value={tournament.tournamentid}
                className="hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                {tournament.tournamentname}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select value={store.serie} onValueChange={updateSerie}>
        <SelectTrigger className="w-[180px] bg-white dark:bg-gray-700">
          <SelectValue placeholder="Select season" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-700">
          <SelectGroup>
            <SelectLabel className="dark:text-gray-300">Seasons</SelectLabel>
            {series?.map((serie) => (
              <SelectItem
                key={serie.id}
                value={serie.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-600"
              >
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
