"use client";

import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
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
    <div className="flex gap-2">
      <Button
        size={"sm"}
        variant={"outline"}
        onClick={() => {
          updateRefFixture(fixture);
          router.push(
            `/home/match-officials/fixtures/${fixture.id}-${fixture.team1_id}-${fixture.team2_id}`
          );
        }}
      >
        Match sheet
      </Button>
    </div>
  );
};
