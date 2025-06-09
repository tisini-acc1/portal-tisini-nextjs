"use client";

import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { OnlineButton } from "@/components/super-agent/online-button";

export const reviewColumns: ColumnDef<AgentFixture>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "fixture",
  //   header: "#",
  // },
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
        <>
          {fixture.game_status === "notstarted" ? (
            <div className="text-center">vs</div>
          ) : (
            <div className="flex justify-between items-center sm:gap-1">
              <div className="p-2 bg-slate-100 rounded-md">
                {fixture.tisiniscores.Home}
              </div>
              <div className="p-2 bg-slate-100 rounded-md">
                {fixture.tisiniscores.Away}
              </div>
            </div>
          )}
        </>
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
    accessorKey: "fixture_type",
    header: "Type",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const fixture = row.original;

      return (
        <div className="flex gap-2">
          <OnlineButton fixture={fixture} />
          <NavigateButton fixture={fixture} />
        </div>
      );
    },
  },
];

const NavigateButton = ({ fixture }: { fixture: AgentFixture }) => {
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
