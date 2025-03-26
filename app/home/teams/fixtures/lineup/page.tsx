"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/lib/store";
import Loading from "@/app/home/loading";
import { Button } from "@/components/ui/button";
import { getAllPlayers, getTeamLineup } from "@/actions/php-actions";
import EditJerseyModal from "@/components/teams/lineups/edit-jersey-modal";
import ReplacePlayerModal from "@/components/teams/lineups/replace-player-modal";
import SwapPlayerModal from "@/components/teams/lineups/swap-player-modal";

const LineupsPage = () => {
  const { store } = useStore((state) => state);
  const fixture = store.userFix;

  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["teamLineups", store.userFix.id, store.team.id],
    queryFn: () => getTeamLineup(store.userFix.id, store.team.id),
  });

  const { data: allPlayers } = useQuery({
    queryKey: ["allPlayers", store.team.id],
    queryFn: () => getAllPlayers(store.team.id),
  });

  if (isLoading || !data || !allPlayers) {
    return <Loading />;
  }

  if (isError) {
    console.log(error);
    return <div>Error</div>;
  }

  const starting = data?.filter((player) => player.player_type === "first11");
  const subs = data?.filter((player) => player.player_type === "sub");

  // console.log(data);

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
          {data && data?.length <= 0 ? (
            <Button
              size={"sm"}
              onClick={() => router.push("/home/teams/fixtures/lineup/add")}
            >
              Select Players
            </Button>
          ) : (
            <div className="flex gap-2">
              <SwapPlayerModal lineups={data as Lineup[]} />
              <ReplacePlayerModal
                lineups={data as Lineup[]}
                allPlayers={allPlayers as TeamPlayer[]}
              />
            </div>
          )}
        </div>
      </header>

      {data && data?.length > 0 ? (
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

export default LineupsPage;
