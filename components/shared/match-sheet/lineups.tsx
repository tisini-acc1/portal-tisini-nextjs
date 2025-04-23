import React from "react";

type LineupProps = {
  home: Lineup[];
  away: Lineup[];
};

const LineupsSection = ({ home, away }: LineupProps) => {
  const hStarting = home.filter((player) => player.player_type === "first11");
  const aStarting = away.filter((player) => player.player_type === "first11");
  const hSubs = home.filter((player) => player.player_type === "sub");
  const aSubs = away.filter((player) => player.player_type === "sub");

  return (
    <section className="bg-gray-100 rounded-md p-2">
      <h1 className="p-2">
        <strong>Match Lineups</strong>
      </h1>

      {home.length <= 0 && away.length <= 0 ? (
        <div className="flex items-center justify-center h-14">
          No lineups from teams yet!
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Home lineup */}
          <LineupDisplay team="Home" starters={hStarting} subs={hSubs} />

          {/* Away lineup */}
          <LineupDisplay team="Away" starters={aStarting} subs={aSubs} />
        </div>
      )}
    </section>
  );
};

type Display = {
  starters: Lineup[];
  subs: Lineup[];
  team: string;
};

const LineupDisplay = ({ starters, subs, team }: Display) => {
  return (
    <div className="w-full lg:w-1/2 bg-gray-50 shadow-md rounded-md p-2">
      <h1 className="text-muted-foreground">{team}</h1>

      {starters.length <= 0 ? (
        <div className="flex items-center justify-center h-14">
          No lineup found!
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-2">
          <div className="col-span-1">
            <h1 className="text-muted-foreground">Starting players</h1>
            {starters.map((player) => (
              <div
                key={player.team_player_id}
                className="mt-2 text-nowrap text-ellipsis"
              >
                <span className="h-4 w-4 mr-1 bg-gray-100 border rounded-full px-2">
                  {player.lineupposition}
                </span>

                <span className={player.verify === "1" ? "text-green-500" : ""}>
                  {player.pname}
                </span>
              </div>
            ))}
          </div>

          <div className="col-span-1">
            <h1 className="text-muted-foreground">Substitutes</h1>
            {subs.map((player) => (
              <div
                key={player.team_player_id}
                className="mt-2 pl-3 text-nowrap text-ellipsis"
              >
                <span className={player.verify === "1" ? "text-green-500" : ""}>
                  {player.pname}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LineupsSection;
