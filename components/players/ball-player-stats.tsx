import { playerBallStats } from "@/lib/calculations";
import { StatBar, StatCard } from "./stats/stats-card-bar";

type Props = { playerData: PData };

const BallPlayerStats = ({ playerData }: Props) => {
  const stats = playerBallStats(playerData?.pnameanddata as Stats);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:px-4">
      <div className="space-y-4">
        {/* Offensive Stats */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white border-b pb-2">
            Offensive Stats
          </h2>

          <StatCard label="Goals" value={stats.goal} />
          <StatCard label="Assists" value={stats.assist} />
          <StatCard label="Chances Created" value={stats.chances} />
          <StatCard label="Offsides" value={stats.offside} />
          <StatCard label="Box Touches" value={stats["box-touch"]} />
          <StatCard label="Box Carries" value={stats["box-carry"]} />
          <StatBar name="Shots On Target" data={stats.shots} />
          <StatBar name="Comp cross" data={stats.crosses} />
        </div>

        {/* Defensive Stats */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white border-b pb-2">
            Defensive Stats
          </h2>

          <StatCard label="Ball Efficiency" value={stats["ball-efficiency"]} />
          <StatCard label="Second Balls" value={stats["second-ball"]} />
          <StatCard label="Interceptions" value={stats.interception} />
          <StatCard label="Clearances" value={stats.clearance} />
          <StatCard label="Blocks" value={stats.blocks} />
          <StatBar name="Tackles made" data={stats.tackles} />
        </div>
      </div>

      <div className="space-y-6">
        {/* Passing Stats */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white border-b pb-2">
            Passing Stats
          </h2>
          <StatCard label="GK distribution" value={stats.distribution} />
          <StatBar name="Comp pass" data={stats.pass} />
          <StatBar name="Comp prog pass" data={stats["prog-pass"]} />
        </div>

        {/* Aerial & GK Stats */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white border-b pb-2">
            Goalkeeping
          </h2>
          <StatCard label="Saves" value={stats.saves} />
          <StatBar name="Claims" data={stats.claims} />
          <StatBar name="Runouts" data={stats.runouts} />
          <StatBar name="Throwouts" data={stats.throwouts} />
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
    </section>
  );
};

export default BallPlayerStats;
