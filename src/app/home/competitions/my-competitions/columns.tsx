"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Competition>[] = [
  {
    accessorKey: "competition_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "competition_type",
    header: "Type",
  },
  {
    accessorKey: "start_period",
    header: "Starts",
  },
  {
    accessorKey: "end_period",
    header: "Ends",
  },
  {
    accessorKey: "teams",
    header: "Reg Teams",
    cell: ({ row }) => {
      const teams = row.original;

      return <div>{teams.teams.length}</div>;
    },
  },
];
