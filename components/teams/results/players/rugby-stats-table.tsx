import React from "react";

const StatCategory = {
  ATTACKING: [
    "tries",
    "assists",
    "goal_kicks",
    "linebreaks",
    "carries",
    "offloads",
    "passes",
    "handling_efficiency",
  ],
  DEFENSE: ["tackle_success", "tackle_dominance", "turnover_won"],
  SETPIECE: [
    "lineout_throws",
    "lineout_steals",
    "scrums_won",
    "scrum_steals",
    "ruck_contest",
  ],
  RESTARTS: [
    "restart_retrievals",
    "restart_reception",
    "retained_kicks",
    "Kicking_errors",
  ],
  DISCIPLINE: ["penalties", "cards"],
};

type StatsProps = {
  players: RugbyPlayerStat[];
};

export const RugbyStatsTable = ({ players }: StatsProps) => {
  const [activeCategory, setActiveCategory] =
    React.useState<string>("ATTACKING");
  const stats = StatCategory[activeCategory as keyof typeof StatCategory];

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="mb-3 overflow-x-auto">
        <div className="flex gap-2 w-max pb-2">
          {Object.keys(StatCategory).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1 text-xs rounded-md whitespace-nowrap ${
                activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {category.charAt(0) + category.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="relative overflow-x-auto bg-white rounded-lg shadow-sm">
        {/* Scrollable Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-medium text-gray-500 uppercase bg-gray-50">
                {/* Fixed Player Column */}
                <th className="sticky left-0 z-20 bg-gray-50 px-2 py-2 text-left min-w-[120px]">
                  Player
                </th>
                {/* Fixed Rating Column */}
                <th className="sticky left-[120px] z-20 bg-gray-50 px-2 py-2 text-center min-w-[60px]">
                  Rating
                </th>
                {/* Scrollable Stat Columns */}
                {stats.map((stat) => (
                  <th key={stat} className="px-2 py-2 text-center min-w-[60px]">
                    {stat.replace("_", " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr
                  key={`${player.name}-${index}`}
                  className="text-sm border-b hover:bg-gray-50 last:border-0"
                >
                  {/* Fixed Player Cell */}
                  <td className="sticky left-0 z-10 bg-white px-2 py-2 whitespace-nowrap font-medium">
                    {player.name}
                  </td>
                  {/* Fixed Rating Cell */}
                  <td className="sticky left-[120px] z-10 bg-white px-2 py-2">
                    <div className="flex justify-center">
                      <span
                        className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold ${
                          parseFloat(player.rating) >= 7
                            ? "bg-green-100 text-green-800"
                            : parseFloat(player.rating) >= 6
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {player.rating}
                      </span>
                    </div>
                  </td>
                  {/* Scrollable Stat Cells */}
                  {stats.map((stat) => {
                    const value = player[stat as keyof RugbyPlayerStat];
                    const stringValue =
                      typeof value === "number" ? value.toString() : value;

                    // Check if the value should be displayed as "-"
                    const displayValue =
                      value === 0 ||
                      stringValue === "0 / 0 0%" ||
                      stringValue === "0 / 0" ||
                      stringValue === "0 / 0  0%"
                        ? "-"
                        : stringValue;

                    return (
                      <td key={stat} className="px-2 py-2 text-center">
                        <span
                          className={
                            typeof stringValue === "string" &&
                            stringValue.includes("%") &&
                            displayValue !== "-"
                              ? "font-medium text-blue-600"
                              : ""
                          }
                        >
                          {displayValue}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-full bg-green-100"></span>
          <span>Rating ≥ 7.0</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-full bg-blue-100"></span>
          <span>Rating 6.0-6.9</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-full bg-red-100"></span>
          <span>Rating &lt; 6.0</span>
        </div>
      </div>
    </div>
  );
};
