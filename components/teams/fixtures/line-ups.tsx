"use client";

import { useStore } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import { getAllPlayers } from "@/actions/php-actions";
// import { SelectStartingPlayer } from "@/components/teams/fixtures/select-starting-player";
// import { useEffect, useState } from "react";
// import { SelectSubPlayer } from "@/components/teams/fixtures/select-sub-player";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
import SelectPlayers from "@/components/teams/fixtures/select-player";
import RugbyPlayers from "./rugbySP";

const Lineups = ({ type }: { type: string }) => {
  const { store } = useStore((state) => state);

  // const [showSubs, setShowSubs] = useState(false);
  // const [open, setOpen] = useState(false);
  // const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  // const [selectedSubs, setSelectedSubs] = useState<Set<string>>(new Set());

  const { data, isError, isLoading } = useQuery({
    queryKey: ["allPlayers", store.team.id],
    queryFn: () => getAllPlayers(store.team.id),
  });

  // const { data: fixType } = useQuery({
  //   queryKey: ["fixType"],
  //   queryFn: () => getFixType(),
  // });

  // const subs = data?.filter((item) => !selectedRows.has(item.id));

  // useEffect(() => {
  //   if (selectedRows.size === 15) {
  //     setOpen(true);
  //   }
  // }, [selectedRows]);

  // const generatePlayerRoles = () => {
  //   const playerRoles: { playerId: string; role: string }[] = [];

  //   // Add first11 players
  //   selectedRows.forEach((playerId) => {
  //     playerRoles.push({ playerId, role: "first11" });
  //   });

  //   // Add sub players
  //   selectedSubs.forEach((playerId) => {
  //     playerRoles.push({ playerId, role: "sub" });
  //   });

  //   return playerRoles;
  // };

  // const onSubmit = () => {
  //   const squad = generatePlayerRoles();
  //   console.log(squad);
  // };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading players. Please try again later.</div>;
  }
  console.log(data);
  return (
    <main>
      <header></header>

      {type === "football" ? (
        <SelectPlayers data={data as TeamPlayer[]} />
      ) : (
        <RugbyPlayers data={data as TeamPlayer[]} />
      )}

      <section className="grid grid-cols-3 gap-8">
        {/* Starting 11
        <div className="bg-football bg-no-repeat bg-contain bg-center h-[75vh]">
          <div className="h-full relative flex flex-col justify-center items-center">
            Forwards (2 players)
            <div className="flex justify-between w-1/2 absolute top-16">
              <div className="w-12 h-12 bg-gray-500 rounded-full text-center">
                FW
              </div>
              <div className="w-12 h-12 bg-gray-500 rounded-full text-center">
                FW
              </div>
            </div>
            Midfielders (4 players)
            <div className="flex justify-between w-full p-4 absolute top-40">
              <div className="w-12 h-12 bg-gray-500 rounded-full text-center">
                MF
              </div>
              <div className="w-12 h-12 bg-gray-500 rounded-full text-center">
                MF
              </div>
              <div className="w-12 h-12 bg-gray-500 rounded-full text-center">
                MF
              </div>
              <div className="w-12 h-12 bg-gray-500 rounded-full text-center">
                MF
              </div>
            </div>
            Defenders (4 players)
            <div className="flex justify-between w-full p-4 absolute bottom-32">
              <div className="w-12 h-12 bg-gray-500 rounded-full text-center">
                DF
              </div>
              <div className="w-12 h-12 bg-gray-500 rounded-full text-center">
                DF
              </div>
              <div className="w-12 h-12 bg-gray-500 rounded-full text-center">
                DF
              </div>
              <div className="w-12 h-12 bg-gray-500 rounded-full text-center">
                DF
              </div>
            </div>
            Goalkeeper (GK)
            <div className="absolute bottom-8 w-12 h-12 bg-gray-500 rounded-full text-center">
              GK
            </div>
          </div>
        </div>  */}
        {/* Players List
        <div className="bg-red-200 h-[75vh] overflow-y-auto">
          {data?.map((player) => (
            <div key={player.id} className="border flex gap-3 items-center p-2">
              <div className="p-7 w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center">
                {player.current_jersey_no}
              </div>

              <div>
                <p>{player.pname}</p>
                <p className="text-gray-100 text-sm">{"midfielder"}</p>
              </div>
            </div>
          ))}
        </div>
        Subs List
        <div className="bg-red-200">subs</div> */}
      </section>

      {/* <section>
        {!showSubs && (
          <SelectStartingPlayer
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            players={data as TeamPlayer[]}
          />
        )}

        {showSubs && (
          <SelectSubPlayer
            players={subs as TeamPlayer[]}
            selectedSubs={selectedSubs}
            setSelectedSubs={setSelectedSubs}
            onSubmit={onSubmit}
          />
        )}

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild className="hidden">
            <Button variant="outline">Show Dialog</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => setShowSubs(true)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section> */}
    </main>
  );
};

export default Lineups;
