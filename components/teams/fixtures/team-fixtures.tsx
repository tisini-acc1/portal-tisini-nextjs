"use client";

import { useEffect, useState } from "react";

import FixturesCalendar from "./fixtures-calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TeamFixtures = ({ data }: { data: TeamTournament[] }) => {
  const [series, setSeries] = useState<TeamSeason[]>([]);
  const [fixtures, setFixtures] = useState<TeamFixture[]>([]);

  useEffect(() => {
    if (data) {
      setSeries(data[0].season);
      setFixtures(data[0].season[0].fixture.reverse());
    }
  }, [data]);

  return (
    <main className="space-y-8">
      <header className="flex gap-4">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select league" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Leagues</SelectLabel>
              {data.map((tournament) => (
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

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select season" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Seasons</SelectLabel>
              {series.map((serie) => (
                <SelectItem key={serie.id} value={serie.id}>
                  {serie.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </header>

      <section>
        <FixturesCalendar fixtures={fixtures} />
      </section>
    </main>
  );
};

export default TeamFixtures;
