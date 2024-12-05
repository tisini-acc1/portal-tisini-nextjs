"use client";

import React, { useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
// import tournamentService from "@/services/tournament.service";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useStore } from "@/lib/store";

const SelectTournament = ({ tournaments }: { tournaments: Competition[] }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const { updateTournament } = useStore((state) => state);

  useEffect(() => {
    if (tournaments && tournaments.length >= 1) {
      setValue(tournaments[0].tournament_id);
    }
  }, [tournaments]);

  useEffect(() => {
    updateTournament(value);
  }, [value, tournaments]);

  return (
    <div className="pr-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between text-ellipsis overflow-hidden whitespace-nowra"
          >
            {value
              ? tournaments.find(
                  (tournament) => tournament.tournament_id === value
                )?.tournament
              : "Select tournament..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." className="h-9" />
            <CommandList>
              <CommandEmpty>No tournament found.</CommandEmpty>
              <CommandGroup>
                {tournaments?.map((tournament) => (
                  <CommandItem
                    key={tournament.tournament_id}
                    value={tournament.tournament_id}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {tournament.tournament}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === tournament.tournament
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SelectTournament;
