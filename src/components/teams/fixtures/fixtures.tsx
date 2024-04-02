"use client";

import { useEffect, useState } from "react";

import { FixturesHeader } from "./fixtures-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

type FixtuerProps = {
  teams: Team[];
  comps: Competition;
};

export const Fixtures = ({ teams, comps }: FixtuerProps) => {
  const [compId, setCompId] = useState("");
  const [teamId, setTeamId] = useState("");
  const [fixtures, setFixtures] = useState<Fixture[]>([]);

  const onCompChange = (values: string) => {
    setCompId(values);
  };

  const onTeamChange = (values: string) => {
    setTeamId(values);
  };

  useEffect(() => {
    const getFixtures = async () => {
      const data = await fetch(`/api/fixtures/${compId}/`);
      const fixtures = await data.json();
      setFixtures(fixtures);
    };

    if (compId) getFixtures();
  }, [compId]);

  console.log(fixtures);

  return (
    <main className="space-y-4">
      <FixturesHeader
        teams={teams}
        comps={comps}
        onCompChange={onCompChange}
        onTeamChange={onTeamChange}
      />

      <section>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fixture</TableHead>
              <TableHead>Field</TableHead>
              <TableHead>Round</TableHead>
              <TableHead>Date</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {fixtures.map((fixture) => (
              <TableRow key={fixture.id}>
                <TableCell>
                  {fixture.fixtures.teams.home_team.team.team_name} v{" "}
                  {fixture.fixtures.teams.away_team.team.team_name}
                </TableCell>
                <TableCell>
                  {fixture.fixtures.fixture_data.field.name}
                </TableCell>
                <TableCell>{fixture.fixtures.fixture_data.matchday}</TableCell>
                <TableCell>
                  {format(
                    new Date(fixture.fixtures.fixture_data.game_date),
                    "yyyy-MM-dd"
                  )}
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="secondary">
                    squad
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
};
