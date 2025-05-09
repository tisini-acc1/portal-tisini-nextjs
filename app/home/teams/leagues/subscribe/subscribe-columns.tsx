"use client";

import TournSubscribeModal from "@/components/teams/leagues/subdcribe-modal";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type Tourn = {
  tournamentname: string;
  tournamentid: string;
  status: string;
  fixture_type: string;
  date_from: null | string;
  date_to: null | string;
};

export const subscribeColumns: ColumnDef<Tourn>[] = [
  {
    accessorKey: "tournamentname",
    header: "Tournament",
  },
  {
    accessorKey: "email",
    header: "Registered Teams",
  },
  {
    accessorKey: "amount",
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
