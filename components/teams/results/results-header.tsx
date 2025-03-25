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
  // fixtureData: TeamFixture[];
}

const ResultsHeader: FC<TeamProps> = ({ tournamentsData, seriesData }) => {
  const { store, updateSerie, updateTournament } = useStore((state) => state);

  // const tourn = [
  //   "27",
  //   "58",
  //   "37",
  //   "35",
  //   "62",
  //   "80",
  //   "79",
  //   "90",
  //   "105",
  //   "98",
  //   "107",
  //   "109",
  //   "125",
  //   "123",
  //   "21",
  // ];
  // const leagues = tournamentsData.filter(
  //   (tournament) => !tourn.includes(tournament.tournamentid)
  // );

  return (
    <header className="flex flex-col-reverse md:flex-row gap-4 justify-end">
      {/* <Select value={store.fixture} onValueChange={updateFixture}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select fixture" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {fixtureData?.map((fixture) => (
              <SelectItem key={fixture.id} value={fixture.id}>
                {`${fixture.team1_name} v ${fixture.team2_name}`}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select> */}

      <div className="flex gap-4">
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
          <SelectTrigger className="w-[140px]">
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
      </div>
    </header>
  );
};

export default ResultsHeader;
