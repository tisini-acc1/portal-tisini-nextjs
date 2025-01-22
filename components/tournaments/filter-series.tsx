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
import { useStore } from "@/lib/store";

const FilterSeries = ({ series }: { series: Serie[] }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const { updateSerie } = useStore((state) => state);

  useEffect(() => {
    if (value) {
      updateSerie(value); // Update the series if value changes
    }
  }, [value, updateSerie]);

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
