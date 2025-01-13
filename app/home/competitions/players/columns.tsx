"use client";

import DeleteFixtureModal from "@/components/fixtures/delete-fixture-modal";
// import EditFixtureModal from "@/components/fixtures/edit-fixture-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Player>[] = [
  {
    accessorKey: "pname",
    header: "Player",
    cell: ({ row }) => {
      const player = row.original;

      return (
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/03.png" />
            <AvatarFallback>{player.current_jersey_no}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">{player.pname}</p>
            <p className="text-sm text-muted-foreground">{player.dob} years</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "nationality",
    header: "Nationality",
  },
  {
    accessorKey: "signed_date",
    header: "Signed on",
  },
  {
    accessorKey: "actions",
    cell: ({}) => {
      // const maintenance = row.original;
      // console.log(maintenance);

      return (
        <div className="flex gap-2">
          {/* <EditFixtureModal /> */}
          <DeleteFixtureModal />
        </div>
      );
    },
  },
];
