import { PlayerStatsHeader } from "./player-stats-header";
import { PlayerStatsCard } from "./player-stats-card";

export const PlayerStats = () => {
  return (
    <main className="space-y-8">
      <PlayerStatsHeader />
      <PlayerStatsCard />
      <PlayerStatsCard />
      <PlayerStatsCard />
      <PlayerStatsCard />
      <PlayerStatsCard />
    </main>
  );
};
