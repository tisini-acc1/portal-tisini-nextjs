"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { useStore } from "@/store/store";
import { Button } from "@/components/ui/button";
import EditFixtureModal from "@/components/fixtures/edit-fixture-modal";
import UpdateScoresModal from "@/components/fixtures/update-scores-modal";
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
    accessorKey: "home_score",
    header: "",
    cell: ({ row }) => {
      const fixture = row.original;

      return (
        <div className="flex items-center justify-center">
          {fixture.game_status === "notstarted" ? (
            <div className="bg-slate-100 p-1 px-2 rounded-md text-center">
              {fixture.matchtime}
            </div>
          ) : (
            <div className="flex justify-between items-center sm:gap-1">
              <div className="px-2 py-1 bg-slate-100 rounded-md">
                {fixture.tisiniscores.Home}
              </div>
              <div className="px-2 py-1 bg-slate-100 rounded-md">
                {fixture.tisiniscores.Away}
              </div>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "team2_name",
    header: "Away",
  },
  {
    accessorKey: "matchday",
    header: "Round",
  },
  {
    accessorKey: "game_date",
    header: "Date",
  },
  {
    accessorKey: "refdata",
    header: "Ref Data",
    cell: ({ row }) => {
      const fixture = row.original;

      return <NavigateButton fixture={fixture} />;
    },
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

const NavigateButton = ({ fixture }: { fixture: AgentFixture }) => {
  const router = useRouter();

  const data = fixture.refdata.length;
  const status = fixture.game_status;

  return (
    <>
      {data <= 0 && status === "notstarted" ? (
        <Button
          variant={"outline"}
          size={"sm"}
          className={"border-red-300 text-red-300 hover:text-red-500"}
          onClick={() =>
            router.push(
              `/home/competitions/fixtures/match-data/${fixture.fixture}-${fixture.team1_id}-${fixture.team2_id}`
            )
          }
        >
          No Data!
        </Button>
      ) : (
        <Button
          variant={"outline"}
          size={"sm"}
          className={"border-green-300 text-green-300 hover:text-green-500"}
        >
          {"Updated"}
        </Button>
      )}
    </>
  );
};

const OfficialButton = ({ fixture }: { fixture: AgentFixture }) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const router = useRouter();

  const updateSheetFix = useStore((state) => state.updateSheetFix);

  const fixId = fixture.fixture;
  const sheetFix = {
    team1_name: fixture.team1_name,
    team1_id: fixture.team1_id,
    team2_name: fixture.team2_name,
    team2_id: fixture.team2_id,
    fixId: fixId,
    fixType: fixture.fixture_type,
  };

  // console.log(fixture);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <span className="sr-only">Open menu</span>
            {/* <MoreHorizontal /> */}
            More
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenAdd(true)}>
            Add officials
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpenUpdate(true)}>
            Update scores
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
          <DropdownMenuItem onClick={() => setOpenDelete(true)}>
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

      <DeleteFixtureModal
        fixture={fixture}
        open={openDelete}
        setOpen={setOpenDelete}
      />

      <UpdateScoresModal
        fixture={fixture}
        open={openUpdate}
        setOpen={setOpenUpdate}
      />
    </>
  );
};
