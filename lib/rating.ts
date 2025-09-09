import { getEvent, getSubEvent } from "./utils";

export type EventPoints = {
  [eventId: string]: number | { [subId: string]: number };
};

export const footballRating = (data: Stats) => {
  const events = Object.values(data);
  let points = 0;
  let goalsConceded = 0;

  const eventPoints: EventPoints = {
    // Attack
    "19": 5, // Goal
    "23": 1, // Assists
    "165": { "422": 2, "423": 1, "424": 0.5 }, // Shot In-box
    "156": { "405": 2, "406": 1, "407": 0.5 }, // Shot Out-box
    "203": 2, // Chance (top-level)
    "473": 2, // Key Pass (subevent under Chance)
    "96": { "154": 1, "155": -0.5 }, // Dribbles
    "200": { "471": 0.5, "472": 0.25 }, // Freekick
    "1": { "150": 3, "304": -3, "151": -3 }, // Penalty: Won, Conceded, Miss
    "155": 0.5, // Box Touch
    "154": 0.5, // Box Carry
    "10": -0.5, // Offside

    // Defense
    "20": -5, // OG
    "97": { "156": 1, "157": -0.5 }, // Tackle / Tackles
    "11": { "74": -0.5, "73": 2, "470": 0.5 },
    "28": { "404": 1, "403": 0.75 }, // Interceptions
    "26": 1, // Clearances
    "202": { "468": 2, "469": 1 }, // Blocks
    "5": { "21": -2, "22": -4 }, // Card (Yellow & Red)

    // Duels
    "93": { "144": 0.5, "143": -0.5 }, // Aerial Duels

    // Passing
    "7": 0.15, // Pass
    "12": 0.15, // Throw in
    "25": -0.15, // Incomplete Pass
    "95": { "152": 1, "153": -0.15 }, // Progress Pass
    "204": {
      "478": 1, // Own won → Ball: Won
      "479": 1, // Opp won
      "480": 0.5, // Second ball
      "481": -0.5, // Own lost → Ball: Lost
      "482": -0.5, // Opp lost ignored here
    },
    "166": { "426": 1, "427": 0.5, "425": 0.25 }, // Cross Left
    "159": { "413": 1, "414": 0.5, "415": 0.25 }, // Cross Right
    "3": 0.5, // Corner

    // Goalkeeping
    "69": {
      "82": -0.5, // Drop
      "79": -1, // Miss
      "80": 1, // GK Catch
      "81": 0.75, // Punch
    },
    "142": { "307": 1, "308": -0.5 }, // Kick-outs
    "32": { "34": 1, "35": -0.5 }, // Run-outs
    "68": { "77": 0.5, "78": -0.5 }, // Throw-out
    "24": { "20": 1, "19": 4 }, // Save: Normal, Penalty
    "168": { "429": 0.25, "431": -0.25 }, // Long GK
    "167": { "428": 0.25, "430": -0.25 }, // Short GK
  };

  events.forEach((event) => {
    const id = event.event_id;
    const subId = event["sub-event"][0]?.subeventid;

    const pointValue = eventPoints[id];

    if (pointValue !== undefined) {
      if (typeof pointValue === "object") {
        // It's a nested subevent object
        const subValue = subId ? pointValue[subId] : undefined;
        if (typeof subValue === "number") {
          points += getSubEvent(data, id, subId) * subValue;
        }
      } else if (typeof pointValue === "number") {
        points += getEvent(data, id) * pointValue;
      }
    }

    // Handle Goal Conceded separately
    if (id === "31") {
      goalsConceded += getEvent(data, "31");
    }
  });

  // Deduct points for goals conceded
  if (goalsConceded === 1) {
    points -= 1;
  } else if (goalsConceded >= 2 && goalsConceded <= 4) {
    points -= 2;
  } else if (goalsConceded > 4) {
    points -= 4;
  }

  // Normalize and calculate final rating
  const MAX_POINTS = 46.05;
  const BASE_RATING = 5.0;
  const rating = ((points / MAX_POINTS) * 5 + BASE_RATING).toFixed(1);

  return rating;
};

export const rugbyRating = (
  data: Stats,
  maxPoints: number,
  eventPoints: EventPoints
) => {
  const events = Object.values(data);

  // Initialize variables
  let points = 0;

  events.forEach((event) => {
    const id = event.event_id;
    const subId = event["sub-event"][0]?.subeventid;

    const pointValue = eventPoints[id];

    if (pointValue !== undefined) {
      if (typeof pointValue === "object") {
        const subValue = pointValue ? pointValue[subId] : undefined;

        if (typeof subValue === "number") {
          points += getSubEvent(data, id, subId) * subValue;
        } else if (typeof pointValue === "number") {
          points += getEvent(data, id) * pointValue;
        }
      }
    }
  });

  const BASE_RATING = 5.0;

  const rating = ((points / maxPoints) * 5 + BASE_RATING).toFixed(1);

  return rating;
};
