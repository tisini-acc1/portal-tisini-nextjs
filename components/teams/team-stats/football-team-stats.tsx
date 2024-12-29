import FootballTeamDefense from "./football/football-defense";
import FootballDisciplineStats from "./football/football-discipline";
import FootballTeamAttack from "./football/football-attack";
import TeamStatsHeader from "./team-stats-header";
import FootballTeamPasses from "./football/football-passing";
import FootballTeamDuel from "./football/football-duel";
import FootballTeamGK from "./football/football-gk";

const FootballTeamStats = ({ data }: { data: SingleFixtureStats }) => {
  const scores = data["scores"];
  const details = data["fixture"][0];
  console.log(data);
  return (
    <section className="grid gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="space-y-4">
          <TeamStatsHeader scores={scores} details={details} />
          <FootballTeamAttack />
        </div>

        <div className="space-y-4">
          <FootballTeamPasses />
        </div>

        <div className="space-y-6">
          <FootballTeamDefense />
          <FootballTeamDuel />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <FootballTeamGK />
        <FootballDisciplineStats />
      </div>
    </section>
  );
};

export default FootballTeamStats;
