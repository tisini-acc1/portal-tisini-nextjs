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
