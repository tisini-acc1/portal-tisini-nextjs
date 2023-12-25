"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Player>[] = [
  {
    accessorKey: "player",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Player
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const player = row.original;
      const name = `${player.player.user.first_name} ${player.player.user.last_name}`;
      const today = new Date().getFullYear();
      const dob = new Date(`${player.player.dob}`).getFullYear();
      const age = today - dob;

      return (
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1>{name}</h1>
            <p className="text-xs font-thin">
              {player.player.nationality}, {age} yrs
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "current_position",
    header: "Position",
    cell: ({ row }) => {
      const player = row.original;

      return <div>{player.current_position}</div>;
    },
  },
  //   {
  //     accessorKey: "nationality",
  //     header: "Nationality",
  //     cell: ({ row }) => {
  //       const player = row.original;

  //       return <div>{player.player.nationality}</div>;
  //     },
  //   },
  {
    accessorKey: "jersey",
    header: "Jersey",
    cell: ({ row }) => {
      const player = row.original;

      return <div>{player.current_jersey_no}</div>;
    },
  },
  {
    accessorKey: "license_no",
    header: "License",
    cell: ({ row }) => {
      const player = row.original;

      return <div>{player.player.license_no}</div>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const player = row.original;

      return <div>{player.player.user.phone_number}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const player = row.original;

      return <div>{player.player.user.email}</div>;
    },
  },
  {
    accessorKey: "contract",
    header: "Contract",
    cell: ({ row }) => {
      const player = row.original;
      const start = new Date(`${player.signed_date}`).getMonth();
      const end = new Date(`${player.expiry_date}`).getMonth();
      const rem = end - start;

      return <div>{rem} months</div>;
    },
  },
];
