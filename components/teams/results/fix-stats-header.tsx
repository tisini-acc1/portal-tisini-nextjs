import Image from "next/image";

type StatsProps = {
  fixData: FixtureData;
  type: string;
};

const FixStatsHeader = ({ fixData }: StatsProps) => {
  //   const data =
  //     type === "rugby15" || type === "rugby7"
  //       ? rugbyData(fixData)
  //       : type === "football"
  //       ? footballData(fixData)
  //       : type === "basketball"
  //       ? basketballData(fixData)
  //       : [];
  const details = fixData["fixture"][0];

  return (
    <div className="h-24 flex flex-col gap-1 text-white font-bold font-mono">
      <div className="p-1 px-2 flex justify-between gap-2 text-xs font-mono overflow-hidden whitespace-nowrap">
        <p className="sm:w-3/4">{details.league}</p>
        <p className="sm:w-1/4 text-right">Round: {details.matchday}</p>
      </div>

      <div className="flex items-center">
        <div className="w-2/5 flex items-center justify-end">
          <div className="text-xs md:text-2xl text-right">
            {details.team1_name}
          </div>
          <div>
            <Image
              src="/homeLogo.png"
              alt="teamName"
              width={55}
              height={55}
              className="object-contain"
            />
          </div>
        </div>
        <div className="w-1/5 flex items-center justify-center font-bold md:text-2xl text-xl">
          {details.home_score} : {details.away_score}
        </div>
        <div className="w-2/5 flex items-center justify-start">
          <div>
            <Image
              src="/awayLogo.png"
              alt="teamName"
              width={55}
              height={55}
              className="object-contain"
            />
          </div>
          <div className="text-xs md:text-2xl">{details.team2_name}</div>
        </div>
      </div>
    </div>
  );
};

export default FixStatsHeader;
