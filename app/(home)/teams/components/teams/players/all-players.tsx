"use client";

import Image from "next/image";
import { useState } from "react";
import { format } from "date-fns";
import { MoreVerticalIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { calculateYearsOld } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import TransferDialog from "../manage-player/transfer-dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CreatePlayerModal from "../manage-player/create-player-modal";
import UploadImagesDialog from "../manage-player/upload-images-dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type PlayerProps = {
  countries: Country[];
  players: TeamPlayer[];
  tournaments: TeamTournament[];
};

const AllPlayers = ({ countries, players, tournaments }: PlayerProps) => {
  const [openUpload, setOpenUpload] = useState(false);
  const [openTransfer, setOpenTransfer] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<TeamPlayer | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const segments = pathname.split("/");
  const index = segments.indexOf("all");
  const path = segments.slice(0, index).join("/");

  if (players.length === 0) {
    return (
      <div className="flex items-center justify-center bg-gray-50 h-screen text-2xl font-mono p-4">
        <p className="w-1/2 mx-auto">
          Ooops! No players available at this time.
        </p>
      </div>
    );
  }

  return (
    <>
      <main className="space-y-4">
        <header className="flex flex-col justify-between gap-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="font-mono text-2xl text-gray-700 dark:text-gray-300">
            <span className="font-bold">{players?.length} </span>

            {players?.length === 1 ? "player" : "players"}
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button
              size="sm"
              variant="outline"
              className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
              onClick={() => router.push(`${path}/active`)}
            >
              Active players
            </Button>

            <CreatePlayerModal countries={countries as Country[]} />
          </div>
        </header>

        {players && players?.length < 0 ? (
          <div className="flex items-center justify-center bg-gray-50 h-screen text-2xl font-mono p-4">
            <p className="w-1/2 mx-auto">
              Ooops! No fixture results available at this time.
            </p>
          </div>
        ) : (
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
                      {player.passportphoto === "" ||
                      player.passportphoto === null ? (
                        <div className="h-64 bg-gray-300 rounded-sm flex items-center justify-center mx-auto text-gray-600">
                          No Image
                        </div>
                      ) : (
                        <Image
                          src={player.passportphoto}
                          alt={"name"}
                          width={150}
                          height={150}
                          className={
                            "h-full w-full object-cover transition-all hover:scale-105 aspect-square"
                          }
                        />
                      )}

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
                          <DropdownMenuItem
                            onClick={() => {
                              setOpenTransfer(true);
                              setSelectedPlayer(player);
                            }}
                          >
                            Transfer
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setOpenUpload(true);
                              setSelectedPlayer(player);
                            }}
                          >
                            Upload
                          </DropdownMenuItem>
                          {/* <DropdownMenuItem
                            onClick={() => {
                              setOpenEdit(true);
                              setSelectedPlayer(player);
                            }}
                          >
                            Edit
                          </DropdownMenuItem> */}
                          <DropdownMenuItem
                            onClick={() => console.log("delete")}
                          >
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
          </section>
        )}

        <TransferDialog
          open={openTransfer}
          setOpen={setOpenTransfer}
          player={selectedPlayer as TeamPlayer}
          // teams={teams as Team[]}
          tournaments={tournaments as TeamTournament[]}
        />

        <UploadImagesDialog
          open={openUpload}
          setOpen={setOpenUpload}
          player={selectedPlayer as TeamPlayer}
        />

        {/* <EditPlayerModal
          open={openEdit}
          setOpen={setOpenEdit}
          player={selectedPlayer as TeamPlayer}
          countries={[]}
        /> */}
      </main>
    </>
  );
};

export default AllPlayers;
