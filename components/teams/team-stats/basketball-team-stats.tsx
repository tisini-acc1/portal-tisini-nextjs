import { getEvent, getPercent } from "@/lib/utils";
import BasketballFouls from "./basketball/basket-fouls";
import BasketballGeneral from "./basketball/basket-general";
import BasketballRebounds from "./basketball/basket-rebounds";
import BasketballScores from "./basketball/basket-scores";
import TeamStatsHeader from "./team-stats-header";

const BasketballTeamStats = ({ data }: { data: FixtureData }) => {
  const home = data.home;
  const away = data.away;

  const basketDetails = basketballData(data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-4">
        <TeamStatsHeader details={basketDetails} />
        <BasketballGeneral home={home} away={away} />
      </div>

      <div>
        <BasketballScores home={home} away={away} />
      </div>

      <div className="space-y-4">
        <BasketballRebounds home={home} away={away} />
        <BasketballFouls home={home} away={away} />
      </div>
    </div>
  );
};

const basketballData = (data: FixtureData) => {
  const details = data.fixture[0];

  const hPass = getEvent(data.home, "182");
  const aPass = getEvent(data.away, "182");

  const hTPass = hPass + getEvent(data.home, "178");
  const aTPass = aPass + getEvent(data.away, "178");

  return {
    homeId: details.team1_id,
    awayId: details.team2_id,
    home: details.team1_name,
    away: details.team2_name,
    homeScore: data.scores.Home,
    awayScore: data.scores.Away,
    league: details.league,
    round: details.matchday,
    status: details.game_status,
    minute: details.minute,
    hPossession: getPercent(hTPass, hPass),
    aPossession: getPercent(aTPass, aPass),
  };
};

export default BasketballTeamStats;
