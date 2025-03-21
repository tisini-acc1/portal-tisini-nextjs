import React from "react";

type LineupProps = {
  home: Lineup[];
  away: Lineup[];
};

const LineupsSection = ({ home, away }: LineupProps) => {
  return (
    <section className="bg-gray-100 rounded-md p-2">
      <h1>
        <strong>Match Lineups</strong>
      </h1>
      <div className="grid grid-cols-2 gap-4 rounded-md">
        <div className="bg-gray-50 shadow-md p-2">
          {home.map((player) => (
            <div key={player.id}>{player.pname}</div>
          ))}
        </div>

        <div className="bg-gray-50 shadow-md p-2">
          {away.map((player) => (
            <div key={player.id}>
              {player.lineupposition} {player.pname}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LineupsSection;
