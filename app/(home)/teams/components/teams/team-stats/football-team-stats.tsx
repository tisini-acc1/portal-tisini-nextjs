import TeamStatsHeader from "./team-stats-header";
import FootballTeamGK from "./football/football-gk";
import FootballTeamDuel from "./football/football-duel";
import FootballTeamAttack from "./football/football-attack";
import FootballTeamPasses from "./football/football-passing";
import FootballTeamDefense from "./football/football-defense";
import FootballDisciplineStats from "./football/football-discipline";
import { footballData } from "@/actions/fix-data";
import FootballChanceStats from "./football/football-chances";
import { useStore } from "@/store/store";
import SimpleFootball from "./football/simple-football";
import { getEvent, getSubEvent } from "@/lib/utils";

export type BallWon = { ownHalf: Stat; oppHalf: Stat };
export type GkRestart = { comp: Stat; total: Stat };
type TeamProps = {
  data: FixtureData;
  videoData: VideoEvent[];
};

const FootballTeamStats = ({ data, videoData }: TeamProps) => {
  const tournament = useStore((state) => state.store.tournament);

  const simple = ["210", "211"];

  const fData = footballData(data);
  // console.log(fData);

  const ballWon = {} as BallWon;
  const restart = {} as GkRestart;

  const home = data.home;
  const away = data.away;

  ballWon["ownHalf"] = {
    home: getSubEvent(data.home, "204", "478"),
    away: getSubEvent(data.away, "204", "478"),
  };

  ballWon["oppHalf"] = {
    home: getSubEvent(data.home, "204", "479"),
    away: getSubEvent(data.away, "204", "479"),
  };

  restart["comp"] = {
    home:
      getSubEvent(home, "142", "307") +
      getSubEvent(home, "68", "77") +
      getSubEvent(home, "167", "428") +
      getSubEvent(home, "168", "429") +
      getSubEvent(home, "216", "522"),
    away:
      getSubEvent(away, "142", "307") +
      getSubEvent(away, "68", "77") +
      getSubEvent(away, "167", "428") +
      getSubEvent(away, "168", "429") +
      getSubEvent(away, "216", "523"),
  };

  restart["total"] = {
    home:
      getEvent(home, "142") +
      getEvent(home, "68") +
      getEvent(home, "167") +
      getEvent(home, "168"),
    away:
      getEvent(away, "142") +
      getEvent(away, "68") +
      getEvent(away, "167") +
      getEvent(away, "168"),
  };

  // console.log(restart);

  return (
    <section className="grid gap-4">
      {!simple.includes(tournament) ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="space-y-4">
            <TeamStatsHeader details={fData.details} />
            <FootballTeamAttack data={fData.attack} />
            <FootballChanceStats data={fData.chance} />
          </div>

          <div className="space-y-5">
            <FootballTeamPasses data={fData.passing} />
            <FootballDisciplineStats data={fData.discipline} />
          </div>

          <div className="space-y-5">
            <FootballTeamDefense data={fData.defense} />
            <FootballTeamGK data={fData.gk} />
            <FootballTeamDuel data={fData.duels} />
          </div>
        </div>
      ) : (
        <SimpleFootball
          data={fData}
          recovery={ballWon}
          restart={restart}
          videoData={videoData}
        />
      )}
    </section>
  );
};

export default FootballTeamStats;
