"use client";

// import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
// import { cn } from "@/lib/utils";

export const basketballColumns: ColumnDef<BasketballPlayerStats>[] = [
  {
    accessorKey: "name",
    header: "Player",
  },
  {
    accessorKey: "point",
    header: "Points",
  },

  {
    accessorKey: "twoPoint",
    header: "2 point",
  },
  {
    accessorKey: "threePoint",
    header: "3 point",
  },

  {
    accessorKey: "freeThrow",
    header: "Free Throw",
  },
  {
    accessorKey: "assist",
    header: "Assists",
  },
  {
    accessorKey: "rebound",
    header: "Rebounds",
  },

  {
    accessorKey: "block",
    header: "Blocks",
  },
  {
    accessorKey: "turnover",
    header: "Turnovers",
  },
  {
    accessorKey: "steal",
    header: "Steals",
  },
  {
    accessorKey: "foul",
    header: "Fouls",
  },
];
