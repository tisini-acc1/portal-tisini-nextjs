import TeamStatsHeader from "./team-stats-header";
import FootballTeamGK from "./football/football-gk";
import FootballTeamDuel from "./football/football-duel";
import FootballTeamAttack from "./football/football-attack";
import FootballTeamPasses from "./football/football-passing";
import FootballTeamDefense from "./football/football-defense";
import FootballDisciplineStats from "./football/football-discipline";
import { footballData } from "@/actions/fix-data";
import { footballDetails } from "@/lib/utils";

const FootballTeamStats = ({ data }: { data: FixtureData }) => {
  const scores = data["scores"];
  const details = data["fixture"][0];
  const hData = footballDetails(
    data["home"],
    data["away"],
    data["fixture"][0],
    data["scores"]
  );
  const fData = footballData(data);
  // console.log(hData);

  return (
    <section className="grid gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="space-y-4">
          <TeamStatsHeader scores={scores} details={details} />
          <FootballTeamAttack data={fData.attack} />
          <FootballDisciplineStats data={fData.discipline} />
        </div>

        <div className="space-y-5">
          <FootballTeamPasses data={fData.passing} />
          <FootballTeamDuel data={fData.duels} />
        </div>

        <div className="space-y-5">
          <FootballTeamDefense data={fData.defense} />
          <FootballTeamGK data={fData.gk} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4"></div>
    </section>
  );
};

export default FootballTeamStats;
