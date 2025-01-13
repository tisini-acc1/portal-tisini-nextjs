"use client";

// import DeleteFixtureModal from "@/components/fixtures/delete-fixture-modal";
// import EditFixtureModal from "@/components/fixtures/edit-fixture-modal";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
// import { useRouter } from "next/navigation";

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
  // {
  //   accessorKey: "line ups",
  //   cell: ({ row }) => {
  //     const fixture = row.original;

  //     const router = useRouter();

  //     return (
  //       <div className="flex gap-2">
  //         <Button
  //           variant={"link"}
  //           onClick={() =>
  //             router.push(
  //               `/home/match-officials/${fixture.id}-${fixture.team1_id}`
  //             )
  //           }
  //         >
  //           Home
  //         </Button>
  //         <Button
  //           variant={"link"}
  //           onClick={() =>
  //             router.push(
  //               `/home/match-officials/${fixture.id}-${fixture.team2_id}`
  //             )
  //           }
  //         >
  //           Away
  //         </Button>
  //       </div>
  //     );
  //   },
  // },
];
