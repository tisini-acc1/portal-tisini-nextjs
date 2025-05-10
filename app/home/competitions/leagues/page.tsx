"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MoreVerticalIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/store/store";
// import { getTournaments } from "@/actions/django-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateTournamentModal from "@/components/tournaments/leagues/create-tournament-modal";
import AddCategoryModal from "@/components/tournaments/leagues/create-category-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddCategoryGroupModal from "@/components/tournaments/leagues/create-category-group-modal";
import UploadTournLogoModal from "@/components/tournaments/leagues/upload-tourn-logo-modal";
import { getTournaments } from "@/actions/php-actions";

const CompetitionsPage = () => {
  const [openGroup, setOpenGroup] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [tournament, setTournament] = useState<Competition | undefined>(
    undefined
  );

  const { store } = useStore((state) => state);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tournaments"],
    queryFn: () => getTournaments(),
  });

  useEffect(() => {
    if (data && store.tournament && store.serie) {
      const tourna = data.find(
        (tournament) => tournament.tournament_id === store.tournament
      );
      setTournament(tourna as Competition);
    }
  }, [store.tournament, store.serie, data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>error</div>;
  }

  // console.log(data);

  return (
    <main className="space-y-4">
      <header className="border-b p-3 h-16">
        <div className="float-right">
          <CreateTournamentModal />
        </div>
      </header>

      <section className="space-y-8">
        <Card>
          <CardHeader className="bg-gray-50">
            <CardTitle className="flex justify-between">
              {tournament?.tournament}

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
                      setOpenCategory(true);
                    }}
                  >
                    Category
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => {
                      setOpenGroup(true);
                      // setSelectedPlayer(player);
                    }}
                  >
                    Group
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setOpenUpload(true)}>
                    Change Logo
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 grid-cols-1">
              <Image
                src={tournament?.leaguelogo ?? "/tournament-img.jpg"}
                alt=""
                width={550}
                height={350}
              />

              <div className="space-y-6 p-2">
                {/* <div>
                <strong>Starts on:</strong>
                <p>{tournament?.date_from}</p>
              </div>

              <div>
                <strong>Ends on:</strong>
                <p>{tournament?.date_from}</p>
              </div> */}

                <div>
                  <strong>Seasons:</strong>
                  <p>{tournament?.season.length}</p>
                </div>

                <div>
                  <strong>Roles:</strong>
                  <p>{"Chair person"}</p>
                </div>
              </div>
            </div>

            <div>
              {tournament?.season.map((season) => (
                <div key={season.id} className="bg-gray-200 p-2 rounded-md">
                  <h3 className="font-semibold">{season.name}</h3>
                  {season.category.map((cate) => (
                    <div key={cate.id} className="flex gap-2">
                      <h4 className="font-medium">{cate.categoryname}</h4>
                      {cate.group.map((grp) => (
                        <div
                          key={grp.id}
                          className="px-2 py-1 bg-gray-100 rounded-sm"
                        >
                          {grp.groupname}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <AddCategoryModal open={openCategory} setOpen={setOpenCategory} />
      <AddCategoryGroupModal open={openGroup} setOpen={setOpenGroup} />
      <UploadTournLogoModal open={openUpload} setOpen={setOpenUpload} />
    </main>
  );
};

export default CompetitionsPage;
