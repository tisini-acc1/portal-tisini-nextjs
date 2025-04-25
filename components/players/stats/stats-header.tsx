import React from "react";

type Props = {
  stats: {
    pname: string;
    position: string;
    mins: string;
    rating: string;
    homeTeam: string;
    awayTeam: string;
  };
};

const StatsHeader = ({ stats }: Props) => {
  return (
    <header className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-sm overflow-hidden">
      {/* Score section */}
      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 p-4">
        <div className="flex items-center justify-center gap-6 sm:gap-8">
          <div className="text-center">
            <p className="md:text-xl font-bold text-gray-900 dark:text-white">
              {stats.homeTeam}
            </p>
          </div>
          <div className="px-2 py-1 md:px-8 sm:py-3 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
            <p className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              - - -
            </p>
          </div>
          <div className="text-center">
            <p className="md:text-xl font-bold text-gray-900 dark:text-white">
              {stats.awayTeam}
            </p>
          </div>
        </div>
      </div>

      {/* Player info section */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          {/* Player identity */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600 flex items-center justify-center text-3xl sm:text-4xl font-bold text-white shadow-md">
              {stats.pname.charAt(0)}
            </div>
            <div>
              <h1 className="md:text-3xl font-bold text-gray-900 dark:text-white">
                {stats.pname}
              </h1>
              <div className="mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200">
                  {stats.position}
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200">
              Rating: {stats.rating}
            </span>
            {stats.mins && (
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200">
                {stats.mins} mins played
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default StatsHeader;
