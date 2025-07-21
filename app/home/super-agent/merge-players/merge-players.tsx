"use client";

import { use } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MergePlayers = ({ data }: { data: Promise<AllTeam[]> }) => {
  const teams = use(data);

  //   console.log(teams);

  return (
    <main>
      <header className="bg-white shadow-md rounded-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-gray-50">
          <div className="flex-1 min-w-0 space-y-3">
            <Select value={""} onValueChange={() => console.log("first")}>
              <SelectTrigger className="w-full sm:w-[280px] bg-white">
                <SelectValue placeholder="Filter team" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {teams?.map((team) => (
                    <SelectItem key={team?.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>
    </main>
  );
};

export default MergePlayers;
