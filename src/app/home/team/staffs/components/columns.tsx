"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Staff>[] = [
  {
    accessorKey: "staff",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Staff
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const staff = row.original;
      const name = `${staff.user.first_name} ${staff.user.last_name}`;

      return <div className="">{name}</div>;
    },
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => {
      const staff = row.original;

      return <div>{staff.position}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const staff = row.original;

      return <div>{staff.user.email}</div>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const staff = row.original;

      return <div>{staff.user.phone_number}</div>;
    },
  },
];
