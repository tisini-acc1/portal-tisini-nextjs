"use client";

import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<AgentFixture>[] = [
  {
    accessorKey: "fixture",
    header: "#",
  },

  {
    accessorKey: "team1_name",
    header: "Fixture",
    cell: ({ row }) => {
      const fixture = row.original;

      return (
        <div className="flex justify-between items-center gap-4 sm:text-xs">
          <div className="">
            <div className="whitespace-nowrap ">{fixture.team1_name}</div>
            <div>{fixture.team2_name}</div>
          </div>

          <div>
            <div>{fixture.tisiniscores.Home}</div>
            <div>{fixture.tisiniscores.Away}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "game_status",
    header: "Status",
  },
  {
    accessorKey: "game_date",
    header: "Date",
  },

  {
    accessorKey: "matchday",
    header: "Round",
  },
];
