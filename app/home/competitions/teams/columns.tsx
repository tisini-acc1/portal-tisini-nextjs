"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import EditPlayerModal from "@/components/teams/manage-player/edit-player-modal";
import { useState } from "react";
// import { getCountry } from "@/actions/php-actions";
// import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Edit3Icon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { useStore } from "@/store/store";
import EditPlayerForm from "@/app/(home)/teams/components/teams/manage-player/edit-player-modal";
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
  {
    id: "actions",
    cell: ({ row }) => {
      const player = row.original;

      return <EditPlayer player={player} />;
    },
  },
];

const EditPlayer = ({ player }: { player: TeamPlayer }) => {
  const [open, setOpen] = useState(false);

  // const { data, isLoading } = useQuery({
  //   queryKey: ["countries"],
  //   queryFn: () => getCountry(),
  // });

  const onOpenChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          variant={"outline"}
          className="text-[#12f202] hover:text-[#12f202] hover:border-[#12f202]"
        >
          <Edit3Icon className="w-4 h-4" color="#12f202" /> Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Player Details</DialogTitle>
          <DialogDescription>
            You are in the process of editing {player.pname}&apos;s details.
          </DialogDescription>
        </DialogHeader>

        <EditPlayerForm
        // open={open}
        // setOpen={setOpen}
        // player={player}
        // countries={data as Country[]}
        />
      </DialogContent>
    </Dialog>
  );
};
