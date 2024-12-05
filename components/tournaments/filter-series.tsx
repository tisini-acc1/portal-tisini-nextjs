"use client";

import React, { useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "cmdk";
import { ChevronsUpDown, Command, Check } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTournamentSeries } from "@/actions/django-actions";
import { useStore } from "@/lib/store";

const FilterSeries = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const { user, updateSeries } = useStore((state) => state);

  const {
    data: series,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["series", user?.tournament], // Safely access `user.tournament`
    queryFn: () => {
      // Check if `user?.tournament` is available
      if (!user?.tournament) {
        return []; // Return an empty array if the tournament is not available
      }
      return getTournamentSeries(user.tournament); // Fetch series based on user.tournament
    },
    enabled: !!user?.tournament, // Only run the query if user.tournament is available
  });

  // Log user and series for debugging
  console.log("user:", user);
  console.log("series:", series);

  useEffect(() => {
    if (value) {
      updateSeries(value); // Update the series if value changes
    }
  }, [value, updateSeries]);

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading series...</div>;
  }

  if (isError) {
    return <div>Error loading series</div>;
  }

  console.log(series);
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
              ? series?.find((serie) => serie.id === value)?.name
              : "Select series..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." className="h-9" />
            <CommandList>
              <CommandEmpty>No tournament found.</CommandEmpty>
              <CommandGroup>
                {series?.map((serie) => (
                  <CommandItem
                    key={serie.id}
                    value={serie.id}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {serie.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === serie.id ? "opacity-100" : "opacity-0"
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

export default FilterSeries;
