"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import EditFixtureModal from "@/components/fixtures/edit-fixture-modal";
import DeleteFixtureModal from "@/components/fixtures/delete-fixture-modal";
import AddFixtureOfficialModal from "@/components/fixtures/add-official-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<AgentFixture>[] = [
  {
    accessorKey: "fixture",
    header: "#",
  },
  {
    accessorKey: "team1_name",
    header: "Home",
  },
  {
    accessorKey: "team2_name",
    header: "Away",
  },
  {
    accessorKey: "game_date",
    header: "Date",
  },
  {
    accessorKey: "game_status",
    header: "Status",
  },

  {
    accessorKey: "matchday",
    header: "Round",
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const fixture = row.original;

      return <OfficialButton fixture={fixture} />;
    },
  },
];

const OfficialButton = ({ fixture }: { fixture: AgentFixture }) => {
  const [openAdd, setOpenAdd] = useState(false);
  const router = useRouter();

  const updateSheetFix = useStore((state) => state.updateSheetFix);

  const fixId = fixture.fixture;
  const sheetFix = {
    team1_name: fixture.team1_name,
    team1_id: fixture.team1_id,
    team2_name: fixture.team2_name,
    team2_id: fixture.team2_id,
    fixId: fixId,
  };

  // console.log(fixture);

  return (
    <>
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
          <DropdownMenuItem onClick={() => setOpenAdd(true)}>
            Add officials
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              updateSheetFix(sheetFix);
              router.push(
                `/home/competitions/fixtures/match-sheet/${fixId}-${fixture.team1_id}-${fixture.team2_id}`
              );
            }}
          >
            Match sheet
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("edit")}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("delete")}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddFixtureOfficialModal
        fixId={fixId}
        open={openAdd}
        setOpen={setOpenAdd}
      />
      <EditFixtureModal fixId={fixId} />
      <DeleteFixtureModal />
    </>
  );
};
