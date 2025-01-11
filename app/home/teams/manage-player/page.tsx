"use client";

import { getAllPlayers, getCountry } from "@/actions/php-actions";
import CreatePlayerModal from "@/components/teams/manage-player/create-player-modal";
// import { Button } from "@/components/ui/button";
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
import { useStore } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import { MoreVerticalIcon } from "lucide-react";
import Image from "next/image";
// import { useRouter } from "next/navigation";

const ManagePlayerPage = () => {
  const { user } = useStore((state) => state);

  // const router = useRouter();

  const { data } = useQuery({
    queryKey: ["allPlayers", user.team],
    queryFn: () => getAllPlayers(user.team),
  });

  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountry(),
  });

  console.log(countries);
  console.log(data);

  return (
    <main className="space-y-4">
      <header className="flex justify-end">
        {/* <Button>
          <PlusCircle /> Create player
        </Button> */}
        <CreatePlayerModal countries={countries as Country[]} />
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {players.map((player) => (
          <Card
            key={player.id}
            // onClick={() =>
            //   router.push(`/home/teams/manage-player/${player.id}`)
            // }
            className="cursor-pointer hover:bg-gray-100"
          >
            <CardHeader className="p-1">
              {/* <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-600">
                No Image
              </div> */}

              <div className="overflow-hidden rounded-md w-full">
                <Image
                  src={"/footballer.jpg"}
                  alt={"name"}
                  width={150}
                  height={150}
                  className={
                    "h-full w-full object-cover transition-all hover:scale-105 aspect-square"
                  }
                />
              </div>
            </CardHeader>

            <CardContent className="p-2">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg whitespace-nowrap text-ellipsis font-semibold text-gray-800">
                  {player.pname}
                </h3>

                {/* Dropdown menu trigger icon in the top right corner */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="">
                    <MoreVerticalIcon
                      className="text-gray-600 cursor-pointer"
                      size={20}
                    />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => console.log("transfer")}>
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
              <p className="text-sm text-gray-600 mb-1">
                <strong>Date of Birth:</strong> {player.dob}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Jersey Number:</strong> {player.current_jersey_no}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Signed Date:</strong> {player.signed_date}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
};

export default ManagePlayerPage;

const players = [
  {
    id: "3884",
    pname: " John Otieno  ",
    dob: "2023-09-23 00:00:00",
    id_no: "",
    current_jersey_no: "21",
    signed_date: "2023-09-23 00:00:00",
  },
  {
    id: "4418",
    pname: "Brian Mboya ",
    dob: "2023-10-28 00:00:00",
    id_no: "",
    current_jersey_no: "21",
    signed_date: "2023-10-28 00:00:00",
  },
  {
    id: "3881",
    pname: "Chris Opondo ",
    dob: "2023-09-23 00:00:00",
    id_no: "",
    current_jersey_no: "33",
    signed_date: "2023-09-23 00:00:00",
  },
  {
    id: "4417",
    pname: "Clinton Asiago ",
    dob: "2023-10-28 00:00:00",
    id_no: "",
    current_jersey_no: "20",
    signed_date: "2023-10-28 00:00:00",
  },
  {
    id: "2",
    pname: "David Kalama ",
    dob: "2024-07-25 12:31:05",
    id_no: "",
    current_jersey_no: "4",
    signed_date: "2021-03-22 23:37:04",
  },
  {
    id: "3891",
    pname: "Desmond Agofa ",
    dob: "2023-11-05 00:00:00",
    id_no: "",
    current_jersey_no: "13",
    signed_date: "2023-09-23 00:00:00",
  },
  {
    id: "3887",
    pname: "Doughlas Mokaya ",
    dob: "2023-09-23 00:00:00",
    id_no: "",
    current_jersey_no: "8",
    signed_date: "2023-09-23 00:00:00",
  },
  {
    id: "3890",
    pname: "Eric Michubu ",
    dob: "2023-09-23 00:00:00",
    id_no: "",
    current_jersey_no: "12",
    signed_date: "2023-09-23 00:00:00",
  },
  {
    id: "3889",
    pname: "Eugene Ikutwa ",
    dob: "2023-09-23 00:00:00",
    id_no: "",
    current_jersey_no: "11",
    signed_date: "2023-09-23 00:00:00",
  },
  {
    id: "4424",
    pname: "Francis Chege ",
    dob: "2023-11-05 00:00:00",
    id_no: "",
    current_jersey_no: "31",
    signed_date: "2023-11-05 00:00:00",
  },
  {
    id: "7",
    pname: "Jacob Onyango ",
    dob: null,
    id_no: "",
    current_jersey_no: "2",
    signed_date: "2021-03-22 23:37:04",
  },
  {
    id: "4429",
    pname: "John Owira ",
    dob: "2023-11-05 00:00:00",
    id_no: "",
    current_jersey_no: "35",
    signed_date: "2023-11-05 00:00:00",
  },
  {
    id: "3885",
    pname: "Malvin  Nderitu ",
    dob: "2023-11-05 00:00:00",
    id_no: "",
    current_jersey_no: "1",
    signed_date: "2023-09-23 00:00:00",
  },
  {
    id: "3880",
    pname: "Martin  Nderitu ",
    dob: "2023-09-23 00:00:00",
    id_no: "",
    current_jersey_no: "30",
    signed_date: "2023-09-23 00:00:00",
  },
  {
    id: "3888",
    pname: "Michael Omondi ",
    dob: "2023-09-23 00:00:00",
    id_no: "",
    current_jersey_no: "10",
    signed_date: "2023-09-23 00:00:00",
  },
  {
    id: "8",
    pname: "Peter Nzuki ",
    dob: null,
    id_no: "",
    current_jersey_no: "31",
    signed_date: "2021-03-22 23:37:04",
  },
  {
    id: "3882",
    pname: "Samuel Ndungu ",
    dob: "2023-09-23 00:00:00",
    id_no: "",
    current_jersey_no: "24",
    signed_date: "2023-09-23 00:00:00",
  },
  {
    id: "3886",
    pname: "Thomas Wainaina ",
    dob: "2023-09-23 00:00:00",
    id_no: "",
    current_jersey_no: "3",
    signed_date: "2023-09-23 00:00:00",
  },
  {
    id: "9619",
    pname: "Dennis Murunga ",
    dob: "2024-08-24 00:00:00",
    id_no: null,
    current_jersey_no: "100",
    signed_date: "2024-08-24 00:00:00",
  },
  {
    id: "9620",
    pname: "Evans Makari Maliachi",
    dob: "2024-08-24 00:00:00",
    id_no: null,
    current_jersey_no: "55",
    signed_date: "2024-08-24 00:00:00",
  },
  {
    id: "10259",
    pname: "Abdalla  Bwire ",
    dob: "2024-09-14 00:00:00",
    id_no: null,
    current_jersey_no: "8",
    signed_date: "2024-09-14 00:00:00",
  },
  {
    id: "10261",
    pname: "Cliff Oruko ",
    dob: "2024-09-14 00:00:00",
    id_no: null,
    current_jersey_no: "37",
    signed_date: "2024-09-14 00:00:00",
  },
  {
    id: "10260",
    pname: "Kevin  Msamali Munika",
    dob: "2024-09-14 00:00:00",
    id_no: null,
    current_jersey_no: "99",
    signed_date: "2024-09-14 00:00:00",
  },
  {
    id: "10258",
    pname: "Marvin  Amuka Ochieng",
    dob: "2024-09-14 00:00:00",
    id_no: null,
    current_jersey_no: "15",
    signed_date: "2024-09-14 00:00:00",
  },
  {
    id: "4423",
    pname: "Daniel Odiwuor ",
    dob: "2023-11-05 00:00:00",
    id_no: "",
    current_jersey_no: "0",
    signed_date: "2023-11-05 00:00:00",
  },
  {
    id: "3883",
    pname: "Kelvin Mwaura ",
    dob: "2023-11-05 00:00:00",
    id_no: "",
    current_jersey_no: "19",
    signed_date: "2023-09-23 00:00:00",
  },
  {
    id: "10527",
    pname: "Simon Munala Abuko",
    dob: "2024-09-21 00:00:00",
    id_no: null,
    current_jersey_no: "7",
    signed_date: "2024-09-21 00:00:00",
  },
  {
    id: "10999",
    pname: "Kenneth Simeon ",
    dob: "2024-10-18 00:00:00",
    id_no: null,
    current_jersey_no: "18",
    signed_date: "2024-10-18 00:00:00",
  },
  {
    id: "11273",
    pname: "Brian Okeyo ",
    dob: "2024-11-03 00:00:00",
    id_no: null,
    current_jersey_no: "21",
    signed_date: "2024-11-03 00:00:00",
  },
  {
    id: "4425",
    pname: "Martin Mbugua ",
    dob: "2023-11-05 00:00:00",
    id_no: "",
    current_jersey_no: "32",
    signed_date: "2023-11-05 00:00:00",
  },
];
