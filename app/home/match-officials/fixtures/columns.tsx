"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/lib/store";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<RefreeFix>[] = [
  {
    accessorKey: "team1_name",
    header: "Fixture",
    cell: ({ row }) => {
      const fixture = row.original;

      return (
        <div className="flex items-center space-x-4">
          {fixture.team1_name} vs {fixture.team2_name}
        </div>
      );
    },
  },
  {
    accessorKey: "game_date",
    header: "Date",
    cell: ({ row }) => {
      const fixture = row.original;

      return (
        <div className="flex items-center space-x-4">
          {format(fixture.game_date, "d MMM, yyyy")}
        </div>
      );
    },
  },
  {
    accessorKey: "matchday",
    header: "Round",
  },
  {
    // accessorKey: "action",
    id: "action",
    enableHiding: true,
    cell: ({ row }) => {
      const fixture = row.original;

      return <NavigateButtons fixture={fixture} />;
    },
  },
];

const NavigateButtons = ({ fixture }: { fixture: RefreeFix }) => {
  const router = useRouter();
  const { updateRefFixture } = useStore((state) => state);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => {
            updateRefFixture(fixture);
            router.push(
              `/home/match-officials/fixtures/match-sheet/${fixture.id}-${fixture.team1_id}-${fixture.team2_id}`
            );
          }}
        >
          Match sheet
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            updateRefFixture(fixture);
            router.push(
              `/home/match-officials/fixtures/verify-lineup/${fixture.id}-${fixture.team1_id}-${fixture.team2_id}`
            );
          }}
        >
          Verify lineup
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
