"use client";

import { getPlayersData } from "@/actions/php-actions";
import Loading from "@/app/home/loading";
import { playerBallStats } from "@/lib/calculations";
import { footballRating } from "@/lib/rating";
import { useStore } from "@/store/store";
import { useQuery } from "@tanstack/react-query";

const SinglePlayerStats = ({ fixtureId }: { fixtureId: string }) => {
  const fixture = useStore((state) => state.store.playerFix);

  const { data, isLoading } = useQuery({
    queryKey: ["singlePlayerStats", fixtureId],
    queryFn: () => getPlayersData(fixtureId, 1),
  });

  if (isLoading || !data) {
    return <Loading />;
  }

  const playerData =
    data && data?.home.length > 0 ? data?.home[0] : data?.away[0];
  const opponent =
    data && data?.home.length > 0 ? fixture?.team1_name : fixture?.team2_name;

  const rating = footballRating(playerData?.pnameanddata as Stats);
  const stats = playerBallStats(playerData?.pnameanddata as Stats);

  console.log(rating);
  console.log(stats);

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
      {/* Player Bio Header */}
      <header className="flex flex-col p-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg mb-6">
        {/* Match info at the top */}
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <p className="text-xl font-bold dark:text-white">
              {fixture.team1_name}
            </p>
          </div>
          <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-xs">
            <p className="text-2xl font-bold text-center dark:text-white">
              2 - 1
            </p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold dark:text-white">
              {fixture.team2_name}
            </p>
          </div>
        </div>

        <div className="flex-shrink-0"></div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-4xl font-bold">
                {playerData?.pname.charAt(0)}
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {playerData?.pname}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                    {"position"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap justify-between items-center gap-2 mt-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                  Rating: {rating}
                </span>

                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                  {78} mins played
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xs">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {stats.goal}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Goals
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xs">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {stats.assist}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Assists
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xs">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {stats.shots.split("/")[0]}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Shots
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="w-32">
        <div className="text-center text-xs mt-1 font-medium">Claims</div>
        <div className="flex h-6 rounded-md overflow-hidden border border-gray-200">
          <div
            className="bg-blue-500"
            style={{ width: "60%" }}
            title="Successful: 6"
          ></div>
          <div
            className="bg-gray-200"
            style={{ width: "40%" }}
            title="Missed: 4"
          ></div>
        </div>
        <div className="flex justify-between mt-1 text-xs">
          <span className="text-blue-600">4</span>
          <span className="text-gray-500">50%</span>
          <span className="text-gray-600">8</span>
        </div>
      </div>

      {/* Stats Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Offensive Stats */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white border-b pb-2">
            Offensive Stats
          </h2>
          <StatCard label="Chances Created" value={stats.chances} />
          <StatCard label="Offsides" value={stats.offside} />
          <StatCard label="Box Touches" value={stats["box-touch"]} />
          <StatCard label="Box Carries" value={stats["box-carry"]} />
          <StatCard label="Shots (On Target)" value={stats.shots} />
          <StatBar name="Shots (On Target)" data={stats.shots} />
          <StatCard label="Crosses" value={stats.crosses} />
        </div>

        {/* Passing Stats */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white border-b pb-2">
            Passing Stats
          </h2>
          <StatCard label="Total Passes" value={stats.pass} />
          <StatCard label="Progressive Passes" value={stats["prog-pass"]} />
        </div>

        {/* Defensive Stats */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white border-b pb-2">
            Defensive Stats
          </h2>

          <StatBar name="Tackles" data={stats.tackles} />
          <StatCard label="Ball Efficiency" value={stats["ball-efficiency"]} />
          <StatCard label="Second Balls" value={stats["second-ball"]} />
          <StatCard label="Interceptions" value={stats.interception} />
          <StatCard label="Clearances" value={stats.clearance} />
          <StatCard label="Blocks" value={stats.blocks} />
        </div>

        {/* Aerial & GK Stats */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white border-b pb-2">
            Goalkeeping
          </h2>
          <StatCard label="Saves" value={stats.saves} />
          <StatCard label="Claims" value={stats.claims} />
          <StatCard label="Distribution" value={stats.distribution} />
          <StatCard label="Runouts" value={stats.runouts} />
          <StatCard label="Throwouts" value={stats.throwouts} />
        </div>

        {/* Discipline Stats */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white border-b pb-2">
            Discipline & Duels
          </h2>

          <StatBar name="Aerial Duels" data={stats.aerial} />
          <StatCard label="Fouls Committed" value={stats.fouls} />
          <StatCard label="Cards" value={stats.cards} />
        </div>
      </div>
    </div>
  );

  // Reusable StatCard component
  function StatCard({ label, value }: { label: string; value: string }) {
    return (
      <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {label}
        </span>
        <span className="font-medium text-gray-900 dark:text-white">
          {value}
        </span>
      </div>
    );
  }

  function StatBar({ name, data }: { name: string; data: string }) {
    // Parse the data string
    const parts = data.split(/\s+/);
    const attempted = parseInt(parts[0]);
    const successful = parseInt(parts[2]);
    const percentage = parts[3];

    // Calculate widths
    const successWidth = (successful / attempted) * 100;
    const missedWidth = 100 - successWidth;

    return (
      <div className="mb-2">
        <div className="text-center text-xs mt-1 font-medium dark:text-gray-300">
          {name}
        </div>
        <div className="flex h-6 rounded-md overflow-hidden border border-gray-200 dark:border-gray-600">
          <div
            className={"bg-blue-500"}
            style={{ width: `${successWidth}%` }}
            title={`Successful: ${successful}`}
          ></div>
          <div
            className={"bg-gray-200"}
            style={{ width: `${missedWidth}%` }}
            title={`Missed: ${attempted - successful}`}
          ></div>
        </div>
        <div className="flex justify-between mt-1 text-xs">
          <span className="text-blue-600 dark:text-blue-400">{successful}</span>
          <span className="text-gray-500 dark:text-gray-400">{percentage}</span>
          <span className="text-gray-600 dark:text-gray-300">{attempted}</span>
        </div>
      </div>
    );
  }
};

export default SinglePlayerStats;
