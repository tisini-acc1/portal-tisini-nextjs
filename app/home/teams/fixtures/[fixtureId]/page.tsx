"use client";

import { useStore } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import { getAllPlayers, getFixType } from "@/actions/php-actions";
import { SelectStartingPlayer } from "@/components/teams/fixtures/select-starting-player";
import { useEffect, useState } from "react";
import { SelectSubPlayer } from "@/components/teams/fixtures/select-sub-player";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const PopulateLineupPage = () => {
  const { user } = useStore((state) => state);

  const [showSubs, setShowSubs] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectedSubs, setSelectedSubs] = useState<Set<string>>(new Set());

  const { data, isError, isLoading } = useQuery({
    queryKey: ["allPlayers", user.team],
    queryFn: () => getAllPlayers(user.team),
  });

  const { data: fixType } = useQuery({
    queryKey: ["fixType"],
    queryFn: () => getFixType(),
  });

  const subs = data?.filter((item) => !selectedRows.has(item.id));

  useEffect(() => {
    if (selectedRows.size === 15) {
      setOpen(true);
    }
  }, [selectedRows]);

  const generatePlayerRoles = () => {
    const playerRoles: { playerId: string; role: string }[] = [];

    // Add first11 players
    selectedRows.forEach((playerId) => {
      playerRoles.push({ playerId, role: "first11" });
    });

    // Add sub players
    selectedSubs.forEach((playerId) => {
      playerRoles.push({ playerId, role: "sub" });
    });

    return playerRoles;
  };

  const onSubmit = () => {
    const squad = generatePlayerRoles();
    console.log(squad);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading players. Please try again later.</div>;
  }
  console.log(fixType);
  return (
    <main>
      <header></header>

      <section>
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
      </section>
    </main>
  );
};

export default PopulateLineupPage;
