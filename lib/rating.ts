import { getEvent, getSubEvent } from "./utils";

type EventPoints = { [eventId: string]: number | { [subId: string]: number } };

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

export const rugbyRating = (data: Stats) => {
  const events = Object.values(data);

  // Initialize variables
  let points = 0;

  const eventPoints: EventPoints = {
    // Forward pass (no sub-event)
    "1": -2,

    // Knock on (no sub-event)
    "2": -2,

    // Tackle
    "3": {
      "10": 2, // Positive
      "11": 1.5, // Negative
      "12": 2.5, // Held up
    },

    // Missed tackle (no sub-event)
    "4": -1,

    // Carries (no sub-event)
    "5": 1,

    // Turnover (no sub-event)
    "6": 3,

    // Penalties conceded (no sub-event)
    "7": -3,

    // Linebreak (no sub-event)
    "8": 3,

    // Score
    "9": {
      "20": -1, // Missed Conversion
      "21": 3, // Successful Drop Goal
      "22": 3, // Successful Penalty
      "23": 2, // Successful Conversion
      "24": -1, // Missed Penalty
      "25": 0, // Missed Drop Goal
      "26": 5, // Try
      "27": 0, // Penalty Try
    },

    // Lineout
    "10": {
      "30": 1, // Won
      "31": -1, // Lost
      "32": 2, // Stolen
    },

    // Scrum
    "11": {
      "33": 0, // Won
      "34": -2, // Lost
      "35": 2, // Stolen
    },

    // Card
    "12": {
      "40": -10, // Red
      "41": -5, // Yellow
    },

    // Incomplete Pass (no sub-event)
    "13": -2,

    // Pass (no sub-event)
    "14": 0.2,

    // Offload (no sub-event)
    "15": 1,

    // Lost ball in carry (no sub-event)
    "16": -2,

    // Visit in opponents 22 (no sub-event)
    "17": 0,

    // Kick for territory
    "18": {
      "50": 0, // Caught
      "51": -2, // Straight out
      "52": 2, // Retrieved
      "53": 2, // 50-22
      "54": 0, // Lineout
      "55": -2, // Dead Ball
      "56": 2, // Knocked On
      "57": -1, // Charged Down
      "58": 0, // Half time
      "59": 0, // Full Time
    },

    // Ruck Won (no sub-event)
    "19": 0,

    // Penalty Gain (no sub-event)
    "20": 0,

    // Step out (no sub-event)
    "21": -1,

    // Charge Down (no sub-event)
    "22": 1,

    // Restart
    "23": {
      "60": 0, // kick off reception won
      "61": -1, // kick off reception lost
      "62": 2, // kick off retrieval won
      "63": 0, // kick off retrieval lost
      "64": -2, // false kick off
      "65": 0, // goal line drop out reception won
      "66": -1, // goal line drop out reception lost
      "67": 2, // goal line drop out retrieval won
      "68": 0, // goal line drop out retrieval lost
      "69": -2, // goal line drop out straight out
      "70": 0, // 22 drop out reception won
      "71": -1, // 22 drop out reception lost
      "72": 2, // 22 drop out retrieval won
      "73": 0, // 22 drop out retrieval lost
      "74": -2, // 22 drop out straight out
    },

    // Maul (no sub-event)
    "24": 0,

    // Lineout throw
    "25": {
      "75": 1, // Front won
      "76": 1, // Middle won
      "77": 1, // Back won
      "78": -2, // Front lost
      "79": -2, // Middle lost
      "80": -2, // Back lost
      "81": 1, // Overthrow Won
      "82": -2, // Overthrow Lost
    },

    // Kick Reception (no sub-event)
    "26": 0,

    // Lineout Pass to Receiver (no sub-event)
    "27": 0,

    // Assist
    "28": {
      "83": 3, // Try Assist
      "84": 2, // Linebreak Assist
    },

    // Ruck Lost (no sub-event)
    "29": -2,

    // Tryline Held Up (no sub-event)
    "30": -1,
  };

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

  const MAX_POINTS = 25.0;
  const BASE_RATING = 5.0;

  const rating = ((points / MAX_POINTS) * 5 + BASE_RATING).toFixed(1);

  return rating;
};
