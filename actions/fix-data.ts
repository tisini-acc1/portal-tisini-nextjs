import {
  footballAttack,
  footballDefense,
  footballDetails,
  footballDiscipline,
  footballDuels,
  footballGK,
  footballPassing,
  rugbyAttack,
  rugbyDefense,
  rugbyDetails,
  rugbyDiscipline,
  rugbyRestarts,
  rugbySetPiece,
  rugbyZones,
} from "@/lib/utils";

export const rugbyData = (data: FixtureData) => {
  const details = data["fixture"][0];
  const scores = data["scores"];
  const home = data["home"];
  const away = data["away"];
  const cards = data["cards"];

  const rugbyData = {} as RugbyData;

  rugbyData["details"] = rugbyDetails(home, away, details, scores);
  rugbyData["defense"] = rugbyDefense(home, away);
  rugbyData["attack"] = rugbyAttack(home, away);
  rugbyData["setPiece"] = rugbySetPiece(home, away);
  rugbyData["discipline"] = rugbyDiscipline(home, away, cards);
  rugbyData["restarts"] = rugbyRestarts(home, away);
  rugbyData["zones"] = rugbyZones(home, away);

  return rugbyData;
};

export const footballData = (data: FixtureData) => {
  const details = data["fixture"][0];
  const scores = data["scores"];
  const home = data["home"];
  const away = data["away"];
  const fouls = data["fouls"];
  const cards = data["cards"];

  const footballData = {} as FootballData;

  footballData["details"] = footballDetails(home, away, details, scores);
  footballData["attack"] = footballAttack(home, away);
  footballData["discipline"] = footballDiscipline(fouls, cards);
  footballData["passing"] = footballPassing(home, away);
  footballData["duels"] = footballDuels(home, away);
  footballData["defense"] = footballDefense(home, away);
  footballData["gk"] = footballGK(home, away);

  return footballData;
};
