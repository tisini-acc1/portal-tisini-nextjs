"use client";

// import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
// import { cn } from "@/lib/utils";

export const columns: ColumnDef<PlayerEvent>[] = [
  {
    accessorKey: "name",
    header: "Player",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "goal",
    header: "Goals",
  },
  {
    accessorKey: "assist",
    header: "Assists",
  },
  {
    accessorKey: "shots",
    header: "Shot / on target",
  },
  {
    accessorKey: "chances",
    header: "Chances",
  },
  {
    accessorKey: "box-carry",
    header: "Box Carry",
  },
  {
    accessorKey: "box-touch",
    header: "Box Touch",
  },
];
