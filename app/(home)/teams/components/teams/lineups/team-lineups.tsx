"use client";

import Image from "next/image";
import React, { use, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import SwapPlayerModal from "./swap-player-modal";
import { useTeamStore } from "@/store/team.store";
import EditJerseyModal from "./edit-jersey-modal";
import ReplacePlayerModal from "./replace-player-modal";

type LineupProps = {
  teamId: string;
  players: Promise<TeamPlayer[]>;
  lineupData: Promise<Lineup[]>;
};

const TeamLineups = ({ players, lineupData, teamId }: LineupProps) => {
  const allPlayers = use(players);
  const lineups = use(lineupData);

  const router = useRouter();
  const pathname = usePathname();
  const fixture = useTeamStore((state) => state.store.userFix);

  const starting = lineups?.filter(
    (player) => player.player_type === "first11"
  );
  const subs = lineups?.filter((player) => player.player_type === "sub");

  useEffect(() => {
    if (fixture && fixture.team1_id) {
      const homeTeam = fixture.team1_id;
      const awayTeam = fixture.team2_id;

      if (homeTeam !== teamId && awayTeam !== teamId) {
        const segments = pathname.split("/");
        const index = segments.indexOf(fixture.id);
        const newPath = segments.slice(0, index).join("/");

        router.push(newPath);
      }
    }
  }, [fixture]);

  return (
    <main className="space-y-2">
      <header className="h-32 bg-header bg-no-repeat bg-center bg-cover rounded-md text-white font-bold font-mono relative">
        <div className="p-1 px-2 flex justify-between gap-2 text-xs font-mono overflow-hidden whitespace-nowrap">
          <p className="sm:w-3/4">{"league"}</p>
          <p className="sm:w-1/4 text-right">Round: {"22"}</p>
        </div>
        <div className="h-24 flex items-center ">
          <div className="w-2/5 flex items-center justify-end">
            <div className="text-xs md:text-2xl text-right">
              {fixture.team1_name}
            </div>
            <div>
              <Image
                src="/homeLogo.png"
                alt="teamName"
                width={90}
                height={90}
                className="object-contain"
              />
            </div>
          </div>
          <div className="w-1/5 flex items-center justify-center font-bold md:text-2xl text-xl">
            VS
          </div>
          <div className="w-2/5 flex items-center justify-start">
            <div>
              <Image
                src="/awayLogo.png"
                alt="teamName"
                width={90}
                height={90}
                className="object-contain"
              />
            </div>
            <div className="text-xs md:text-2xl">{fixture.team2_name}</div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 p-1">
          {lineups && lineups?.length <= 0 ? (
            <Button
              size={"sm"}
              onClick={() => router.push(`${pathname}/add-lineup`)}
            >
              Select Players
            </Button>
          ) : (
            <div className="flex gap-2">
              <SwapPlayerModal lineups={lineups as Lineup[]} />
              <ReplacePlayerModal
                lineups={lineups as Lineup[]}
                allPlayers={allPlayers as TeamPlayer[]}
              />
            </div>
          )}
        </div>
      </header>

      {lineups && lineups?.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
          <div className="space-y-2 p-4">
            <h1>Starting players</h1>
            {starting?.map((player) => (
              <div key={player.id} className="border p-3 bg-gray-300">
                <div className="flex justify-between items-center">
                  {player.Jersey_No} {player.pname}
                  <EditJerseyModal player={player} />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2 p-4">
            <h1>Subs</h1>
            {subs?.map((player) => (
              <div key={player.id} className="border p-3 bg-gray-300">
                <div className="flex justify-between items-center">
                  {player.Jersey_No} {player.pname}
                  <EditJerseyModal player={player} />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="h-96 rounded-md flex items-center justify-center text-2xl bg-muted">
          No Players!
        </section>
      )}
    </main>
  );
};

export default TeamLineups;
