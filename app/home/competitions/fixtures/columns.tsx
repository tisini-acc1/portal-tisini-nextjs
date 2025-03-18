"use client";

import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

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
import { useState } from "react";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<Fixture>[] = [
  {
    accessorKey: "id",
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

const OfficialButton = ({ fixture }: { fixture: Fixture }) => {
  const [openAdd, setOpenAdd] = useState(false);
  const router = useRouter();

  const fixId = fixture.id;

  return (
    <>
      <div className="flex gap-2">
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
              Officials
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("edit")}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("delete")}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          size={"sm"}
          variant={"outline"}
          onClick={() => router.push(`/home/competitions/fixtures/${fixId}`)}
          className="hidden"
        >
          more
        </Button>
      </div>

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
