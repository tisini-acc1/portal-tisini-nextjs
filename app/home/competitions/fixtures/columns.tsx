"use client";

// import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

// import { Button } from "@/components/ui/button";
// import { DialogTrigger } from "@/components/ui/dialog";
// import EditFixtureModal from "@/components/fixtures/edit-fixture-modal";
// import DeleteFixtureModal from "@/components/fixtures/delete-fixture-modal";
import AddFixtureOfficialModal from "@/components/fixtures/add-official-modal";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

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
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const fixture = row.original;

      return (
        <div className="space-x-1">
          <AddFixtureOfficialModal fixId={fixture.id} />
          {/* <EditFixtureModal fixId={fixture.id} />
          <DeleteFixtureModal /> */}
        </div>
      );
    },
  },

  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const fixture = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(fixture.id)}
  //           >
  //             <EditFixtureModal fixId={fixture.id} />
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
