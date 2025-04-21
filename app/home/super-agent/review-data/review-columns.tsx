"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

export const reviewColumns: ColumnDef<AgentFixture>[] = [
  {
    accessorKey: "fixture",
    header: "#",
  },
  {
    accessorKey: "team1_name",
    header: () => <div className="text-right">Home</div>,
    cell: ({ row }) => {
      const fixture = row.original;

      return (
        <div className="text-right">
          <div>{fixture.team1_name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "tisiniscores",
    header: "",
    cell: ({ row }) => {
      const fixture = row.original;

      return (
        <div className="flex justify-between items-center sm:gap-1">
          <div className="p-2 bg-slate-100 rounded-md">
            {fixture.tisiniscores.Home}
          </div>
          <div className="p-2 bg-slate-100 rounded-md">
            {fixture.tisiniscores.Away}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "team2_name",
    header: "Away",
  },
  {
    accessorKey: "game_status",
    header: "Status",
  },
  {
    accessorKey: "game_date",
    header: "Date",
  },
  {
    accessorKey: "matchday",
    header: "Round",
  },
  {
    accessorKey: "series",
    header: "Review",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const fixture = row.original;

      return <NavigateButton fixture={fixture} />;
    },
  },
];

const NavigateButton = (fixture: { fixture: AgentFixture }) => {
  const router = useRouter();

  return (
    <Button
      size={"sm"}
      onClick={() =>
        router.push(`/home/super-agent/review-data/${fixture.fixture}`)
      }
    >
      Review
    </Button>
  );
};
