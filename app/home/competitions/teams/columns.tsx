"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

export const columns: ColumnDef<TeamPlayer>[] = [
  {
    accessorKey: "player_id",
    header: "#",
  },
  {
    accessorKey: "pname",
    header: "Player",
    cell: ({ row }) => {
      const player = row.original;

      return (
        <div className="flex items-center gap-1">
          <Avatar>
            <AvatarImage>{player.passportphoto}</AvatarImage>
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div className="p-2 rounded-md">{player.pname}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "nationality",
    header: "Nationality",
  },
  {
    accessorKey: "current_jersey_no",
    header: "Jersey",
  },
  {
    accessorKey: "dob",
    header: "Age",
    cell: ({ row }) => {
      const player = row.original;

      const today = new Date();
      const dob = new Date(player.dob);
      const age = today.getFullYear() - dob.getFullYear();

      return <div>{age} years</div>;
    },
  },
  {
    accessorKey: "signed_date",
    header: "Signed",
    cell: ({ row }) => {
      const player = row.original;

      const date = new Date(player.signed_date);

      const formattedDate = date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      return <div>{formattedDate.replace(",", " ")}</div>;
    },
  },
  //   {
  //     id: "actions",
  //     cell: ({ row }) => {
  //       const fixture = row.original;

  //       return <NavigateButton fixture={fixture} />;
  //     },
  //   },
];

// const NavigateButton = (fixture: { fixture: AgentFixture }) => {
//   const router = useRouter();

//   return (
//     <Button
//       size={"sm"}
//       onClick={() =>
//         router.push(`/home/super-agent/review-data/${fixture.fixture.fixture}`)
//       }
//     >
//       Review
//     </Button>
//   );
// };
