"use client";

import TournSubscribeModal from "@/app/(home)/teams/components/teams/leagues/subscribe-modal";
import { ColumnDef } from "@tanstack/react-table";

export const subscribeColumns: ColumnDef<OpenCompetition>[] = [
  {
    accessorKey: "name",
    header: "Tournament",
  },
  {
    accessorKey: "latestseriesnoteam",
    header: "Registered Teams",
  },
  {
    accessorKey: "latestseriesname",
    header: "Current season",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const tournament = row.original;

      return <TournSubscribeModal tournament={tournament} />;
    },
  },
];
