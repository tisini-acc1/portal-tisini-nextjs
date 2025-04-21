"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import { getTournamentTeams } from "@/actions/django-actions";
import { useStore } from "@/store/store";

const FilterTournTeams = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [teams, setTeams] = useState<CompTeam[]>([]);

  const { store, updateTeam } = useStore((state) => state);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tournamentTeams", store.tournament, store.serie],
    queryFn: () => getTournamentTeams(store.tournament, store.serie),
  });

  useEffect(() => {
    if (data) {
      setTeams(data);
      if (data && data.length >= 1) {
        setValue(data[0].id);
      }
    }
  }, [data]);

  useEffect(() => {
    if (value) {
      const team = teams.filter((t) => t.id === value);
      updateTeam({ id: team[0].id, name: team[0].name });
    }
  }, [updateTeam, value]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>No teams for this season</div>;
  }

  // console.log(store.team);
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
