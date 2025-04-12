import React from "react";

const StatCategory = {
  ATTACKING: [
    "goal",
    "assist",
    "chances",
    "offside",
    "box-touch",
    "box-carry",
    "shots",
    "crosses",
  ],
  PASSING: ["pass", "prog-pass"],
  DEFENSE: [
    "tackles",
    "ball-efficiency",
    "interception",
    "clearance",
    "blocks",
    "aerial",
  ],
  GOALKEEPING: ["claims", "distribution", "saves", "runouts", "throwouts"],
  DISCIPLINE: ["fouls", "cards"],
};

export const PlayerStatsTable = ({ players }: { players: PlayerEvent[] }) => {
  const [activeCategory, setActiveCategory] =
    React.useState<string>("ATTACKING");
  const stats = StatCategory[activeCategory as keyof typeof StatCategory];

  // Calculate dynamic grid columns (3 fixed + variable stats)
  const gridTemplateColumns = `minmax(120px, 1fr) minmax(60px, 0.5fr) repeat(${stats.length}, minmax(90px, 1fr))`;

  return (
    <div className="max-w-6xl mx-auto p-2">
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

      {/* Dynamic Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-max">
            {" "}
            {/* Remove fixed min-width */}
            {/* Table Header - Dynamic Grid */}
            <div
              className="grid gap-1 p-2 bg-gray-50 text-xs font-medium text-gray-500 uppercase border-b"
              style={{ gridTemplateColumns }}
            >
              <div className="sticky left-0 bg-gray-50 z-10">Player</div>
              <div className="sticky left-[120px] bg-gray-50 z-10 text-center">
                Rating
              </div>
              {stats.map((stat) => (
                <div key={stat} className="text-center">
                  {stat.replace("-", " ")}
                </div>
              ))}
            </div>
            {/* Player Rows - Same Dynamic Grid */}
            {players.map((player, index) => (
              <div
                key={`${player.name}-${index}`}
                className="grid gap-1 p-2 text-sm border-b hover:bg-gray-50 last:border-0"
                style={{ gridTemplateColumns }}
              >
                {/* Player Name */}
                <div className="font-medium truncate sticky left-0 bg-white z-10">
                  {player.name}
                </div>

                {/* Rating */}
                <div className="flex justify-center sticky left-[120px] bg-white z-10">
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

                {/* Stats */}
                {stats.map((stat) => (
                  <div key={stat} className="text-center">
                    <span
                      className={
                        player[stat as keyof Player].includes("%")
                          ? "font-medium text-blue-600"
                          : ""
                      }
                    >
                      {player[stat as keyof Player]}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend (unchanged) */}
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
