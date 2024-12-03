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

const FilterTournTeams = ({ teams }: { teams: CompTeam[] }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  useEffect(() => {
    if (teams && teams.length >= 1) {
      setValue(teams[0].id);
    }
  }, [teams]);

  return (
    <div className="">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between text-ellipsis overflow-hidden whitespace-nowra"
          >
            {value
              ? teams.find((team) => team.id === value)?.name
              : "Select team..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." className="h-9" />
            <CommandList>
              <CommandEmpty>No tournament found.</CommandEmpty>
              <CommandGroup>
                {teams?.map((team) => (
                  <CommandItem
                    key={team.id}
                    value={team.id}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {team.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === team.name ? "opacity-100" : "opacity-0"
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

export default FilterTournTeams;