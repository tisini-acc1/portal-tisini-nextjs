"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { OnlineButton } from "@/components/super-agent/online-button";
import EditFixtureModal from "@/components/fixtures/edit-fixture-modal";
import DeleteFixtureModal from "@/components/fixtures/delete-fixture-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);

  const router = useRouter();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"sm"}>More</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() =>
              router.push(`/home/super-agent/clean-data/${fixture.fixture}`)
            }
          >
            Clean/Merge
          </DropdownMenuItem>

          <DropdownMenuItem>Edit</DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpen(!openDel)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditFixtureModal fixture={fixture} open={open} setOpen={setOpen} />

      <DeleteFixtureModal
        fixture={fixture}
        open={openDel}
        setOpen={setOpenDel}
      />
    </>
  );
};
