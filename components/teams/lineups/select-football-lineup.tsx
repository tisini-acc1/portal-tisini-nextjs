"use client";

import * as React from "react";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { SelectPlayer } from "./select-rugby-lineup";
import { createFixtureLineup } from "@/actions/php-actions";

type LineupProps = {
  data: TeamPlayer[];
  fixId: string;
};

const rugby15Positions = [
  "Goalkeeper",
  "Rightback",
  "Leftback",
  "Centerback",
  "Centerback",
  "Defensive midfielder",
  "Central midfielder",
  "Leftwinger",
  "Rightwinger",
  "Central attacking mid",
  "Forward",
  "Sub player",
  "Sub player",
  "Sub player",
  "Sub player",
  "Sub player",
  "Sub player",
  "Sub player",
  "Sub player",
  "Sub player",
  "Sub player",
  "Sub player",
  "Sub player",
];

const SelectFootballLineup = ({ data, fixId }: LineupProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState<{
    [position: string]: TeamPlayer | null;
  }>({});

  const { toast } = useToast();
  const router = useRouter();

  // Function to handle player selection for a specific position
  const handleSelectPlayer = (position: string, player: TeamPlayer | null) => {
    setSelectedPlayers((prev) => ({
      ...prev,
      [position]: player === prev[position] ? null : player,
    }));
  };

  // console.log(selectedPlayers);
  const first11 = {
    "1": selectedPlayers["0"] || null,
    "2": selectedPlayers["1"] || null,
    "3": selectedPlayers["2"] || null,
    "4": selectedPlayers["3"] || null,
    "5": selectedPlayers["4"] || null,
    "6": selectedPlayers["5"] || null,
    "7": selectedPlayers["6"] || null,
    "8": selectedPlayers["7"] || null,
    "9": selectedPlayers["8"] || null,
    "10": selectedPlayers["9"] || null,
    "11": selectedPlayers["10"] || null,
  };

  const subs = [
    selectedPlayers["11"],
    selectedPlayers["12"],
    selectedPlayers["13"],
    selectedPlayers["14"],
    selectedPlayers["15"],
    selectedPlayers["16"],
    selectedPlayers["17"],
    selectedPlayers["18"],
    selectedPlayers["19"],
    selectedPlayers["20"],
    selectedPlayers["21"],
    selectedPlayers["22"],
  ];

  // console.log(first11);
  // console.log(subs);

  // Get a list of all selected player IDs
  const selectedPlayerIds = Object.values(selectedPlayers)
    .filter((player) => player !== null)
    .map((player) => player!.id);

  const onSubmit = async () => {
    // const squad = generatePlayerRoles();
    setIsLoading(true);

    if (Object.keys(selectedPlayers).length < 11) {
      toast({
        title: "Error!",
        description: "Please select all the required players.",
      });
      return;
    }

    const lineUp: CreateLineup = {
      first11: first11,
      subs: subs as TeamPlayer[],
    };

    try {
      const res = await createFixtureLineup(lineUp, fixId);

      // console.log(res);

      if (res.error === "0") {
        router.refresh();
        router.back();
        toast({ description: res.message, title: "Success!" });
      } else if (res.error === "1") {
        toast({ description: res.message, title: "Error!" });
      }
    } catch (error) {
      console.log(error);
      toast({
        description: "Failed to update players lineup",
        title: "Error!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(selectedPlayerIds);

  return (
    <main className="h-screen overflow-hidden">
      <section className="flex h-full bg-gray-200">
        {/* Sticky Instructions Div */}
        <div className="hidden lg:block w-1/2 sticky top-0 h-screen p-5 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Instructions</h2>
          <div className="flex flex-col gap-4 h-96 w-full items-center justify-center">
            <p className="font-mono text-5xl text-center">
              {selectedPlayerIds.length}
            </p>
            <strong>Selected Players</strong>
            <Button
              type="submit"
              onClick={() => onSubmit()}
              disabled={isLoading}
            >
              Submit{" "}
              {isLoading && <RotateCcw className="ml-2 h-4 w-4 animate-spin" />}
            </Button>
          </div>
        </div>

        {/* Scrollable Positions Div */}
        <div className="flex-1 p-5 space-y-6 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Select players</h2>
          {rugby15Positions.map((position, idx) => (
            <div key={idx} className="flex shadow-md p-3 rounded-md bg-white">
              <div className="text-2xl flex items-center justify-center w-12">
                {idx + 1}
              </div>

              <div className="w-full">
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-sm text-muted-foreground">{position}</p>
                  <SelectPlayer
                    players={data.filter(
                      (player) =>
                        !selectedPlayerIds.includes(player.id) ||
                        selectedPlayers[idx.toString()]?.id === player.id
                    )}
                    selectedPlayer={selectedPlayers[idx.toString()]}
                    onSelect={(player) =>
                      handleSelectPlayer(idx.toString(), player)
                    }
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            type="submit"
            className="lg:hidden block"
            onClick={() => onSubmit()}
            disabled={isLoading}
          >
            Submit{" "}
            {isLoading && <RotateCcw className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        </div>
      </section>
    </main>
  );
};

export default SelectFootballLineup;
