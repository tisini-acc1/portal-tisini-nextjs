"use client";

import { useRouter } from "next/navigation";
import { PlusCircleIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import Loading from "../../loading";
import { useStore } from "@/store/store";
import { Button } from "@/components/ui/button";
import { getTeamTournaments } from "@/actions/php-actions";

const LeaguesPage = () => {
  const team = useStore((state) => state.store.team);

  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["teamTournaments", team.id],
    queryFn: () => getTeamTournaments(team.id, ""),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading tournaments. Please try again later.</div>;
  }

  // console.log(data);

  return (
    <main className="p-6 font-mono">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
        <div className="text-lg text-gray-700">
          {team.name} is participating in{" "}
          <span className="font-semibold text-indigo-600">{data?.length}</span>{" "}
          tournament(s).
        </div>

        <Button onClick={() => router.push("/home/teams/leagues/subscribe")}>
          <PlusCircleIcon /> Register
        </Button>
      </header>

      <section className="space-y-6">
        {data?.map((tournament) => (
          <div
            key={tournament.tournamentid}
            className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {tournament.tournamentname}
              </h3>
              <span className="text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                {tournament.season.length} season
                {tournament.season.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="space-y-4">
              {tournament.season.map((season) => (
                <div
                  key={season.id}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-800">{season.name}</h4>

                    <span className="text-sm text-gray-500">
                      {season.fixture.length} game
                      {season.fixture.length !== 1 ? "s" : ""} played
                    </span>
                  </div>

                  {/* Progress bar for season completion (optional) */}
                  {/* <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          (season.fixture.length / 20) * 100
                        )}%`,
                      }}
                    ></div>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default LeaguesPage;
