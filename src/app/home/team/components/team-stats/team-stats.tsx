import StatsTabs from "./stats-tabs";
import TeamStatsHeader from "./team-stats-header";

const TeamStats = () => {
  return (
    <main className="space-y-2">
      <TeamStatsHeader />
      <StatsTabs />
    </main>
  );
};

export default TeamStats;
