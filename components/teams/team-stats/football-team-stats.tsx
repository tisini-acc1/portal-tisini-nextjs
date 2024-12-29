import TeamStatsHeader from "./team-stats-header";
import FootballTeamGK from "./football/football-gk";
import FootballTeamDuel from "./football/football-duel";
import FootballTeamAttack from "./football/football-attack";
import FootballTeamPasses from "./football/football-passing";
import FootballTeamDefense from "./football/football-defense";
import FootballDisciplineStats from "./football/football-discipline";

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
          <FootballDisciplineStats />
        </div>

        <div className="space-y-4">
          <FootballTeamPasses />
          <FootballTeamDuel />
        </div>

        <div className="space-y-5">
          <FootballTeamDefense />
          <FootballTeamGK />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4"></div>
    </section>
  );
};

export default FootballTeamStats;
