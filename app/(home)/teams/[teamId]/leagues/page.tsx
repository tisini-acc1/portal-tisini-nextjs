import React from "react";
import { getTeamTournaments } from "@/data/teams/team-tournaments";
import SubscibeButton from "../../components/teams/leagues/navigate-button";

type LeagueProps = {
  params: Promise<{ teamId: string }>;
};

const LeaguesPage = async ({ params }: LeagueProps) => {
  const { teamId } = await params;

  const id = teamId.split("-").pop() || "";

  const data = await getTeamTournaments(id, "");

  const index = teamId.split("-").indexOf(id);
  const teamname = teamId.split("-").splice(0, index).join(" ");

  return (
    <main className="p-6 font-mono">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
        <div className="text-lg text-gray-700 capitalize">
          {teamname} is participating in{" "}
          <span className="font-semibold text-indigo-600">{data?.length}</span>{" "}
          tournament(s).
        </div>

        <SubscibeButton />
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
