"use client";

import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Transfer>[] = [
  // {
  //   accessorKey: "id",
  //   header: "#",
  // },
  {
    accessorKey: "pname",
    header: "Player",
  },
  {
    accessorKey: "date_created",
    header: "Date",
    cell: ({ row }) => {
      const transfer = row.original;

      return <div>{format(transfer.date_created, "d MMM, yyyy")}</div>;
    },
  },

  {
    accessorKey: "team2name",
    header: "Transfer to",
  },
  {
    accessorKey: "transfer_cost",
    header: "Transfer Fee",
  },
  {
    accessorKey: "union_cost",
    header: "Union Fee",
  },
  {
    accessorKey: "status",
    header: "Status",
  },

  // {
  //   accessorKey: "actions",
  //   cell: ({ row }) => {
  //     const maintenance = row.original;
  //     console.log(maintenance);

  //     return (
  //       <div className="flex gap-2">
  //         <EditFixtureModal />
  //         <DeleteFixtureModal />
  //       </div>
  //     );
  //   },
  // },
];
