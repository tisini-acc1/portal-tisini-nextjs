"use client";

import Image from "next/image";
import { useState } from "react";
import { format } from "date-fns";
// import { useRouter } from "next/navigation";
import { MoreVerticalIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/lib/store";
import { calculateYearsOld } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
import { getAllPlayers, getCountry } from "@/actions/php-actions";
import TransferDialog from "@/components/teams/manage-player/transfer-dialog";
import CreatePlayerModal from "@/components/teams/manage-player/create-player-modal";
import {
  Card,
  CardContent,
  // CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ManagePlayerPage = () => {
  const { user } = useStore((state) => state);
  const [openTransfer, setOpenTransfer] = useState(false);

  // const router = useRouter();

  const { data: players } = useQuery({
    queryKey: ["allPlayers", user.team],
    queryFn: () => getAllPlayers(user.team),
  });

  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountry(),
  });

  // console.log(countries);
  // console.log(players?.slice().reverse());

  return (
    <main className="space-y-4">
      <header className="flex justify-between items-center">
        <p className="font-mono">{players?.length} players</p>
        <CreatePlayerModal countries={countries as Country[]} />
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {players
          ?.slice()
          .reverse()
          .map((player) => (
            <Card
              key={player.id}
              className="cursor-pointer hover:bg-gray-100 font-mono"
            >
              <CardHeader className="p-1">
                <div className="relative overflow-hidden rounded-md w-full">
                  {/* <Image
                    src={"/footballer.jpg"}
                    alt={"name"}
                    width={150}
                    height={150}
                    className={
                      "h-full w-full object-cover transition-all hover:scale-105 aspect-square"
                    }
                  /> */}

                  <div className="h-64 bg-gray-300 rounded-sm flex items-center justify-center mx-auto text-gray-600">
                    No Image
                  </div>

                  <div className="absolute top-1 right-1 bg-gray-200 rounded-full h-7 w-7 flex justify-center items-center font-semibold">
                    {player.current_jersey_no}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-2">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="lg:text-sm whitespace-nowrap text-ellipsis font-semibold text-gray-800">
                    {player.pname}
                  </h3>

                  {/* Dropdown menu trigger icon in the top right corner */}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="">
                      <MoreVerticalIcon
                        className="text-gray-600 cursor-pointer"
                        size={17}
                      />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setOpenTransfer(true)}>
                        Transfer
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log("edit")}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log("delete")}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="lg:text-xs text-gray-600 mb-1">
                  <strong>
                    {player.nationality}
                    {","}
                  </strong>{" "}
                  {calculateYearsOld(player.dob)} year(s)
                </p>
                {/* <p className="text-xs text-gray-600 mb-1">
                  <strong>Jersey Number:</strong> {player.current_jersey_no}
                </p> */}
                <p className="lg:text-xs text-gray-600">
                  <strong>Signed Date:</strong>{" "}
                  {format(new Date(player.signed_date), "d MMM, yyy")}
                </p>
              </CardContent>
            </Card>
          ))}

        <TransferDialog open={openTransfer} setOpen={setOpenTransfer} />
      </section>
    </main>
  );
};

export default ManagePlayerPage;
