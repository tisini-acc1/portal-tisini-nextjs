"use client";

import DeleteFixtureModal from "@/components/fixtures/delete-fixture-modal";
import EditFixtureModal from "@/components/fixtures/edit-fixture-modal";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Fixture>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "game_date",
    header: "Date",
  },
  {
    accessorKey: "game_status",
    header: "Status",
  },
  {
    accessorKey: "team1_name",
    header: "Home",
  },
  {
    accessorKey: "team2_name",
    header: "Away",
  },
  {
    accessorKey: "matchday",
    header: "Round",
  },

  {
    accessorKey: "actions",
    cell: ({ row }) => {
      const maintenance = row.original;

      return (
        <div className="flex gap-2">
          <EditFixtureModal />
          <DeleteFixtureModal />
        </div>
      );
    },
  },
];
