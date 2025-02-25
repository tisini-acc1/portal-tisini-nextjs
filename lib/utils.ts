import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateYearsOld(dateString: string): number {
  // Convert the given date string into a Date object
  const givenDate = new Date(dateString);
  // Get today's date
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const timeDifference = currentDate.getTime() - givenDate.getTime();

  // Convert milliseconds to years (accounting for leap years using 365.25 days per year)
  const yearsDifference = timeDifference / (1000 * 60 * 60 * 24 * 365.25);

  // Return the difference in full years (rounded down)
  return Math.floor(yearsDifference);
}

export const getPercent = (total: number, stat: number) => {
  if (total === 0) {
    return 0;
  }

  return Math.round((stat / total) * 100);
};

export const getEvent = (arry: Stats, eventId: string) => {
  const value = Object.values(arry).filter((item) => item.event_id === eventId);

  return parseInt(value[0]?.total);
};

export const getSubEvent = (
  array: Stats,
  eventId: string,
  subEventId: string
) => {
  const event = Object.values(array).filter(
    (item) => item.event_id === eventId
  );

  const stat = event[0]["sub-event"].filter(
    (item) => item.subeventid === subEventId
  );

  return parseInt(stat[0].totalsubevent);
};

export const calcBallPosession = (homeArry: Stats, awayArry: Stats) => {
  const hPass = getEvent(homeArry, "7");
  const aPass = getEvent(awayArry, "7");

  const hCompProgPass = getSubEvent(homeArry, "95", "152");
  const aCompProgPass = getSubEvent(awayArry, "95", "152");

  const homePasses = hPass + hCompProgPass;
  const awayPasses = aPass + aCompProgPass;

  const total = hPass + hCompProgPass + aPass + aCompProgPass;

  const home = Math.round((homePasses / total) * 100);
  const away = Math.round((awayPasses / total) * 100);

  return { home, away };
};

export const calcRugbyPosession = (homeArry: Stats, awayArry: Stats) => {
  const hPass = getEvent(homeArry, "91");
  const aPass = getEvent(awayArry, "91");

  const hCarry = getEvent(homeArry, "44");
  const aCarry = getEvent(awayArry, "44");

  const homePasses = hPass + hCarry;
  const awayPasses = aPass + aCarry;

  const total = homePasses + awayPasses;

  const home = Math.round((homePasses / total) * 100);
  const away = Math.round((awayPasses / total) * 100);

  return { home, away };
};

export const calcRugbyTerritory = (homeArry: Stats, awayArry: Stats) => {
  const hCarries =
    getSubEvent(homeArry, "44", "359") +
    getSubEvent(homeArry, "44", "360") +
    getSubEvent(awayArry, "44", "357") +
    getSubEvent(awayArry, "44", "358");
  const aCarries =
    getSubEvent(awayArry, "44", "359") +
    getSubEvent(awayArry, "44", "360") +
    getSubEvent(homeArry, "44", "357") +
    getSubEvent(homeArry, "44", "358");

  const total = getEvent(homeArry, "44") + getEvent(awayArry, "44");

  const home = Math.round((hCarries / total) * 100);
  const away = Math.round((aCarries / total) * 100);

  return { home, away };
};

export const footballDetails = (
  home: Stats,
  away: Stats,
  details: FixtureDetails,
  scores: Scores
) => {
  const fixture = {} as Details;

  const possession = calcBallPosession(home, away);

  fixture["homeId"] = details.team1_id;
  fixture["awayId"] = details.team2_id;
  fixture["home"] = details.team1_name;
  fixture["away"] = details.team2_name;
  fixture["homeScore"] = scores.Home;
  fixture["awayScore"] = scores.Away;
  fixture["league"] = details.league;
  fixture["round"] = details.matchday;
  fixture["status"] = details.game_status;
  fixture["minute"] = details.minute;
  fixture["hPossession"] = possession.home;
  fixture["aPossession"] = possession.away;

  return fixture;
};

export const footballAttack = (home: Stats, away: Stats) => {
  const attack = {} as FootballAttack;

  attack["keyPass"] = {
    home: getEvent(home, "98"),
    away: getEvent(away, "98"),
  };
  attack["setPiece"] = {
    home: getEvent(home, "161"),
    away: getEvent(away, "161"),
  };
  attack["freekick"] = {
    home: getSubEvent(home, "21", "398"),
    away: getSubEvent(away, "21", "398"),
  };
  attack["boxTouch"] = {
    home: getEvent(home, "155"),
    away: getEvent(away, "154"),
  };
  attack["boxCarry"] = {
    home: getEvent(home, "154"),
    away: getEvent(away, "154"),
  };
  attack["offside"] = {
    home: getEvent(home, "10"),
    away: getEvent(away, "10"),
  };
  attack["shotInBox"] = {
    home: {
      value: getSubEvent(home, "165", "422"),
      total: getEvent(home, "165"),
    },
    away: {
      value: getSubEvent(away, "165", "422"),
      total: getEvent(away, "165"),
    },
  };
  attack["shotOutBox"] = {
    home: {
      value: getSubEvent(home, "156", "405"),
      total: getEvent(home, "156"),
    },
    away: {
      value: getSubEvent(away, "156", "405"),
      total: getEvent(away, "156"),
    },
  };

  return attack;
};

export const footballDiscipline = (fouls: Fouls, cards: Cards) => {
  const discipline = {} as FootballDiscipline;

  discipline["fouls"] = {
    home: fouls.Homecommitted,
    away: fouls.Awaycommitted,
  };
  discipline["cards"] = cards;

  return discipline;
};

export const footballPassing = (home: Stats, away: Stats) => {
  const passing = {} as FootballPassing;

  passing["corner"] = { home: getEvent(home, "3"), away: getEvent(away, "3") };
  passing["ballLost"] = {
    home: getSubEvent(home, "67", "76"),
    away: getSubEvent(away, "67", "76"),
  };
  passing["ballWon"] = {
    home: getSubEvent(home, "67", "75"),
    away: getSubEvent(away, "67", "75"),
  };
  passing["throwIn"] = {
    home: getSubEvent(home, "12", "400"),
    away: getSubEvent(away, "12", "400"),
  };
  passing["longThrowIn"] = {
    home: getSubEvent(home, "12", "399"),
    away: getSubEvent(away, "12", "399"),
  };
  passing["pass"] = {
    home: {
      value: getEvent(home, "7"),
      total: getEvent(home, "25") + getEvent(home, "7"),
    },
    away: {
      value: getEvent(away, "7"),
      total: getEvent(away, "25") + getEvent(away, "7"),
    },
  };
  passing["progPass"] = {
    home: {
      value: getSubEvent(home, "95", "152"),
      total: getEvent(home, "95"),
    },
    away: {
      value: getSubEvent(away, "95", "152"),
      total: getEvent(away, "95"),
    },
  };
  passing["crossRight"] = {
    home: {
      value: getSubEvent(home, "159", "413"),
      total: getEvent(home, "159"),
    },
    away: {
      value: getSubEvent(away, "159", "413"),
      total: getEvent(away, "159"),
    },
  };
  passing["crossLeft"] = {
    home: {
      value: getSubEvent(home, "166", "426"),
      total: getEvent(home, "166"),
    },
    away: {
      value: getSubEvent(away, "166", "426"),
      total: getEvent(away, "166"),
    },
  };

  return passing;
};

export const footballDuels = (home: Stats, away: Stats) => {
  const duels = {} as FootballDuels;

  duels["aerial"] = {
    home: {
      value: getSubEvent(home, "93", "144"),
      total: getEvent(home, "93"),
    },
    away: {
      value: getSubEvent(away, "93", "144"),
      total: getEvent(away, "93"),
    },
  };

  duels["ground"] = {
    home: {
      value: getSubEvent(home, "94", "146"),
      total: getEvent(home, "94"),
    },
    away: {
      value: getSubEvent(away, "94", "146"),
      total: getEvent(away, "94"),
    },
  };

  return duels;
};

export const footballDefense = (home: Stats, away: Stats) => {
  const defense = {} as FootballDefense;

  defense["clearance"] = {
    home: getEvent(home, "26"),
    away: getEvent(away, "26"),
  };
  defense["blocks"] = {
    home: getEvent(home, "27"),
    away: getEvent(away, "27"),
  };
  defense["foulWon"] = {
    home: getSubEvent(home, "11", "73"),
    away: getSubEvent(away, "11", "73"),
  };
  defense["intercptOwn"] = {
    home: getSubEvent(home, "28", "403"),
    away: getSubEvent(away, "28", "403"),
  };
  defense["intercptOpp"] = {
    home: getSubEvent(home, "28", "404"),
    away: getSubEvent(away, "28", "404"),
  };
  defense["tackles"] = {
    home: {
      value: getSubEvent(home, "97", "156"),
      total: getEvent(home, "97"),
    },
    away: {
      value: getSubEvent(away, "97", "156"),
      total: getEvent(away, "97"),
    },
  };

  return defense;
};

export const footballGK = (home: Stats, away: Stats) => {
  const gk = {} as FootballGK;

  gk["saves"] = {
    home: getEvent(home, "24"),
    away: getEvent(away, "24"),
  };
  gk["runOuts"] = {
    home: getEvent(home, "32"),
    away: getEvent(away, "32"),
  };
  gk["kickOuts"] = {
    home: getEvent(home, "142"),
    away: getEvent(away, "142"),
  };
  gk["throwOuts"] = {
    home: getEvent(home, "68"),
    away: getEvent(away, "68"),
  };
  gk["claims"] = {
    home: {
      value: getSubEvent(home, "69", "80") + getSubEvent(home, "69", "81"),
      total: getEvent(home, "69"),
    },
    away: {
      value: getSubEvent(away, "69", "80") + getSubEvent(away, "69", "81"),
      total: getEvent(away, "69"),
    },
  };
  gk["goalkick"] = {
    home: {
      value: getEvent(home, "167"),
      total: getEvent(home, "167") + getEvent(home, "168"),
    },
    away: {
      value: getEvent(away, "167"),
      total: getEvent(away, "167") + getEvent(away, "168"),
    },
  };

  return gk;
};

export const rugbyDefense = (home: Stats, away: Stats) => {
  const defense = {} as RugbyDefense;

  defense["negTackle"] = {
    home: getSubEvent(home, "42", "57"),
    away: getSubEvent(away, "42", "57"),
  };
  defense["posTackle"] = {
    home: getSubEvent(home, "42", "56"),
    away: getSubEvent(away, "42", "56"),
  };
  defense["missedTackle"] = {
    home: getEvent(home, "43"),
    away: getEvent(away, "43"),
  };
  defense["turnoversWon"] = {
    home: getEvent(home, "45"),
    away: getEvent(away, "45"),
  };
  defense["succTackle"] = {
    home: {
      value: getEvent(home, "42"),
      total: getEvent(home, "42") + getEvent(home, "43"),
    },
    away: {
      value: getEvent(away, "42"),
      total: getEvent(away, "42") + getEvent(away, "43"),
    },
  };

  return defense;
};

export const rugbyAttack = (home: Stats, away: Stats) => {
  const attack = {} as RugbyAttack;

  attack["tries"] = {
    home: getSubEvent(home, "49", "66"),
    away: getSubEvent(away, "49", "66"),
  };
  attack["carries"] = {
    home: getEvent(home, "44"),
    away: getEvent(away, "44"),
  };
  attack["handlingErrors"] = {
    home:
      getEvent(home, "40") +
      getEvent(home, "41") +
      getEvent(home, "87") +
      getEvent(home, "103"),
    away:
      getEvent(away, "40") +
      getEvent(away, "41") +
      getEvent(away, "87") +
      getEvent(away, "103"),
  };
  attack["linebreaks"] = {
    home: getEvent(home, "47"),
    away: getEvent(away, "47"),
  };
  attack["offloads"] = {
    home: getEvent(home, "92"),
    away: getEvent(away, "92"),
  };
  attack["oppVisit22"] = {
    home: getEvent(home, "104"),
    away: getEvent(away, "104"),
  };
  attack["passAcc"] = {
    home: {
      value: getEvent(home, "91"),
      total: getEvent(home, "91") + getEvent(home, "40") + getEvent(home, "87"),
    },
    away: {
      value: getEvent(away, "91"),
      total: getEvent(away, "91") + getEvent(away, "40") + getEvent(away, "87"),
    },
  };
  attack["conversion"] = {
    home: {
      value: getEvent(home, "40"),
      total: getEvent(home, "40"),
    },
    away: {
      value: getEvent(away, "40"),
      total: getEvent(away, "40"),
    },
  };

  return attack;
};

export const rugbySetPiece = (home: Stats, away: Stats) => {
  const setPiece = {} as RugbySetPiece;

  setPiece["setPieceWon"] = {
    home:
      getSubEvent(home, "50", "40") +
      getSubEvent(home, "50", "65") +
      getSubEvent(home, "51", "38") +
      getSubEvent(home, "51", "58"),
    away:
      getSubEvent(away, "50", "40") +
      getSubEvent(away, "50", "65") +
      getSubEvent(away, "51", "38") +
      getSubEvent(home, "51", "58"),
  };
  setPiece["scrumPenalty"] = {
    home: getSubEvent(home, "46", "129"),
    away: getSubEvent(away, "46", "129"),
  };
  setPiece["scrumSteal"] = {
    home: getSubEvent(home, "51", "58"),
    away: getSubEvent(away, "51", "58"),
  };
  setPiece["lineoutSteal"] = {
    home: getSubEvent(home, "50", "65"),
    away: getSubEvent(away, "50", "65"),
  };
  setPiece["successfulMaul"] = {
    home: getSubEvent(home, "146", "328"),
    away: getSubEvent(away, "146", "328"),
  };
  setPiece["unsuccessfulMaul"] = {
    home: getSubEvent(home, "146", "329"),
    away: getSubEvent(away, "146", "329"),
  };
  setPiece["lineoutRetention"] = {
    home: {
      value:
        getSubEvent(home, "151", "377") +
        getSubEvent(home, "151", "378") +
        getSubEvent(home, "151", "379") +
        getSubEvent(home, "151", "391"),
      total: getEvent(home, "151"),
    },
    away: {
      value:
        getSubEvent(away, "151", "377") +
        getSubEvent(away, "151", "378") +
        getSubEvent(away, "151", "379") +
        getSubEvent(away, "151", "391"),
      total: getEvent(away, "151"),
    },
  };
  setPiece["scrumRetention"] = {
    home: {
      value: getSubEvent(home, "51", "38"),
      total: getSubEvent(home, "51", "38") + getSubEvent(home, "51", "39"),
    },
    away: {
      value: getSubEvent(away, "51", "38"),
      total: getSubEvent(away, "51", "38") + getSubEvent(away, "51", "39"),
    },
  };

  return setPiece;
};

export const rugbyDiscipline = (home: Stats, away: Stats, cards: Cards) => {
  const discipline = {} as RugbyDiscipline;

  discipline["penalty"] = {
    home: getEvent(home, "46"),
    away: getEvent(away, "46"),
  };
  discipline["cards"] = cards;

  return discipline;
};

export const rugbyRestarts = (home: Stats, away: Stats) => {
  const restarts = {} as RugbyRestarts;

  restarts["restarts"] = {
    home:
      getSubEvent(home, "133", "247") +
      getSubEvent(home, "133", "249") +
      getSubEvent(home, "133", "252") +
      getSubEvent(home, "133", "254") +
      getSubEvent(home, "133", "257") +
      getSubEvent(home, "133", "259"),
    away:
      getSubEvent(away, "133", "247") +
      getSubEvent(away, "133", "249") +
      getSubEvent(away, "133", "252") +
      getSubEvent(away, "133", "254") +
      getSubEvent(away, "133", "257") +
      getSubEvent(away, "133", "259"),
  };
  restarts["restartsRetention"] = {
    home: {
      value:
        getSubEvent(home, "133", "247") +
        getSubEvent(home, "133", "249") +
        getSubEvent(home, "133", "252") +
        getSubEvent(home, "133", "254") +
        getSubEvent(home, "133", "257") +
        getSubEvent(home, "133", "259"),
      total: getEvent(home, "133"),
    },
    away: {
      value:
        getSubEvent(away, "133", "247") +
        getSubEvent(away, "133", "249") +
        getSubEvent(away, "133", "252") +
        getSubEvent(away, "133", "254") +
        getSubEvent(away, "133", "257") +
        getSubEvent(away, "133", "259"),
      total: getEvent(away, "133"),
    },
  };

  return restarts;
};

export const rugbyZones = (home: Stats, away: Stats) => {
  const zones = {} as RugbyZones;

  zones["own22"] = {
    home: getSubEvent(home, "44", "357"),
    away: getSubEvent(away, "44", "357"),
  };
  zones["own50"] = {
    home: getSubEvent(home, "44", "358"),
    away: getSubEvent(away, "44", "358"),
  };
  zones["opp50"] = {
    home: getSubEvent(home, "44", "359"),
    away: getSubEvent(away, "44", "359"),
  };
  zones["opp22"] = {
    home: getSubEvent(home, "44", "360"),
    away: getSubEvent(away, "44", "360"),
  };

  return zones;
};

export const rugbyDetails = (
  home: Stats,
  away: Stats,
  details: FixtureDetails,
  scores: Scores
) => {
  const fixture = {} as Details;

  const possession = calcRugbyPosession(home, away);
  // const territory = calcRugbyTerritory(home, away);

  fixture["homeId"] = details.team1_id;
  fixture["awayId"] = details.team2_id;
  fixture["home"] = details.team1_name;
  fixture["away"] = details.team2_name;
  fixture["homeScore"] = scores.Home;
  fixture["awayScore"] = scores.Away;
  fixture["league"] = details.league;
  fixture["round"] = details.matchday;
  fixture["status"] = details.game_status;
  fixture["minute"] = details.minute;
  fixture["hPossession"] = possession.home;
  fixture["aPossession"] = possession.away;

  return fixture;
};
