"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";

export const ballPointsColumns: ColumnDef<TopScorer>[] = [
  {
    accessorKey: "playername",
    header: "player",
    cell: ({ row }) => {
      const player = row.original;

      return (
        <div className="font-medium text-foreground flex gap-2">
          <Avatar>
            <AvatarFallback></AvatarFallback>
            <AvatarImage></AvatarImage>
          </Avatar>
          <div>
            <p className="text-sm">{player.playername}</p>
            <p className="text-muted-foreground text-xs">{player.teamname}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "goal",
    header: "Goals",
  },
];
