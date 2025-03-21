"use client";

import Image from "next/image";

type HeaderProps = { details: MatchDetails; fixData: RefEvents[] };

const MatchSheetHeader = ({ details, fixData }: HeaderProps) => {
  let scores = { home: 0, away: 0 };
  const homeTeam = details.hometeam;

  if (details.fixture_type === "rugby15") {
    let home = 0;
    let away = 0;
    for (const data of fixData) {
      if (["43", "44", "200"].includes(data.subeventid)) {
        if (data.teamname === homeTeam) {
          home += 3;
        } else {
          away += 3;
        }
      } else if (data.subeventid === "60") {
        if (data.teamname === homeTeam) {
          home += 2;
        } else {
          away += 2;
        }
      } else if (data.subeventid === "66") {
        if (data.teamname === homeTeam) {
          home += 5;
        } else {
          away += 5;
        }
      }
    }

    scores.home = home;
    scores.away = away;
  }

  return (
    <header className="bg-header rounded-md text-white font-bold font-mono">
      <div className="p-1 px-2 flex justify-between gap-2 text-xs font-mono overflow-hidden whitespace-nowrap">
        <p className="sm:w-3/4">{details?.league}</p>
        <p className="sm:w-1/4 text-right">Round: {details?.matchday}</p>
      </div>

      <div className="h-24 flex items-center">
        <div className="w-2/5 flex items-center justify-end">
          <div className="text-xs md:text-2xl text-right">
            {details.hometeam}
          </div>
          <div>
            <Image
              src="/homeLogo.png"
              alt="teamName"
              width={70}
              height={70}
              className="object-contain"
            />
          </div>
        </div>
        <div className="w-1/5 flex items-center justify-center font-bold md:text-2xl text-xl">
          {details.fixture_type === "rugby15" ? (
            <p>
              {scores.home} - {scores.away}
            </p>
          ) : (
            "VS"
          )}
        </div>
        <div className="w-2/5 flex items-center justify-start">
          <div>
            <Image
              src="/awayLogo.png"
              alt="teamName"
              width={70}
              height={70}
              className="object-contain"
            />
          </div>
          <div className="text-xs md:text-2xl">{details?.awayteam}</div>
        </div>
      </div>
    </header>
  );
};

export default MatchSheetHeader;
