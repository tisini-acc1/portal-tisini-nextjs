"use client";

import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns: ColumnDef<Transfer>[] = [
  // {
  //   accessorKey: "id",
  //   header: "#",
  // },
  {
    accessorKey: "pname",
    header: "Player",

    cell: ({ row }) => {
      const transfer = row.original;

      return (
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/03.png" />
            <AvatarFallback>PP</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">{transfer.pname}</p>
            <p className="text-xs text-muted-foreground">
              {transfer.team1name}
            </p>
          </div>
        </div>
      );
    },
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
