"use client";

import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { OnlineButton } from "@/components/super-agent/online-button";

export const columns: ColumnDef<AgentFixture>[] = [
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
  //   {
  //     accessorKey: "game_status",
  //     header: "Status",
  //   },
  {
    accessorKey: "game_date",
    header: "Date",
  },

  {
    accessorKey: "series",
    header: "Transport",
    cell: ({ row }) => {
      const fixture = row.original;

      return (
        <Button
          size={"sm"}
          variant={"outline"}
          className="text-red-400 border-red-400"
          onClick={() => console.log(fixture.fixture)}
        >
          Pending
        </Button>
      );
    },
  },
  {
    accessorKey: "fixture_type",
    header: "Fees",
    cell: ({ row }) => {
      const fixture = row.original;

      return (
        <Button
          size={"sm"}
          variant={"outline"}
          className="text-green-500 border-green-500"
          onClick={() => console.log(fixture.fixture)}
        >
          Credited
        </Button>
      );
    },
  },
  {
    accessorKey: "matchday",
    header: "Status",
    cell: ({ row }) => {
      const fixture = row.original;

      return (
        <Button
          size={"sm"}
          variant={"outline"}
          className="text-green-500 border-green-500"
          onClick={() => console.log(fixture.fixture)}
        >
          Reviewed
        </Button>
      );
    },
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
        router.push(`/home/tisini-agent/fixtures/${fixture.fixture}`)
      }
    >
      More
    </Button>
  );
};
