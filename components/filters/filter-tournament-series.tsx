"use client";

import React, { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const FilterTournamentSeries = ({
  tournaments,
}: {
  tournaments: Tournament[];
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [serieVal, setSerieVal] = useState<string>("");
  const [series, setSeries] = useState<Serie[]>([]);

  const { updateSeries, updateTournament } = useStore((state) => state);

  useEffect(() => {
    if (tournaments && tournaments.length >= 1) {
      setValue(tournaments[0].id);
    }
  }, [tournaments]);

  useEffect(() => {
    updateTournament(value);
  }, [updateTournament, value, tournaments]);

  useEffect(() => {
    if (value) {
      const selectedTournament = tournaments.find((item) => item.id === value);
      if (selectedTournament) {
        setSeries(selectedTournament.series);
        setSerieVal(
          selectedTournament.series.length > 0
            ? selectedTournament.series[0].id
            : ""
        );
      } else {
        setSeries([]);
        setSerieVal("");
      }
    }
  }, [value, tournaments]);

  useEffect(() => {
    if (serieVal) {
      updateSeries(serieVal);
    }
  }, [updateSeries, serieVal]);

  const handleValueChange = (value: string) => {
    setSerieVal(value);
  };

  return (
    <>
      {tournaments.length > 1 && (
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
                  ? tournaments.find((tournament) => tournament.id === value)
                      ?.name
                  : "Select tournament..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search framework..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No tournament found.</CommandEmpty>
                  <CommandGroup>
                    {tournaments?.map((tournament) => (
                      <CommandItem
                        key={tournament.id}
                        value={tournament.id}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        {tournament.name}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === tournament.name
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
      )}

      {/* Series Select Popover */}
      {value && series.length > 1 && (
        <div className="pr-4">
          <Select value={serieVal} onValueChange={handleValueChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {series.map((serie) => (
                <SelectItem key={serie.id} value={serie.id}>
                  {serie.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
};

export default FilterTournamentSeries;
