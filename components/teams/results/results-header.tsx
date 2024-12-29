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
  fixtureData: TeamFixture[];
}

const ResultsHeader: FC<TeamProps> = ({
  tournamentsData,
  seriesData,
  fixtureData,
}) => {
  const { user, updateSeries, updateTournament, updateFixture } = useStore(
    (state) => state
  );

  console.log(fixtureData);
  return (
    <header className="flex justify-between">
      <Select value={user.fixture} onValueChange={updateFixture}>
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
      </Select>

      <div className="flex-1 flex gap-4">
        <Select value={user.tournament} onValueChange={updateTournament}>
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

        <Select value={user.series} onValueChange={updateSeries}>
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
      </div>
    </header>
  );
};

export default ResultsHeader;
