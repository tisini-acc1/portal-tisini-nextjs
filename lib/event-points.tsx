import { EventPoints } from "./rating";

export const eventPoint15s: EventPoints = {
  // Forward pass (no sub-event)
  "40": -2,

  // Knock on (no sub-event)
  "41": -2,

  // Tackle
  "42": {
    "56": 2, // Positive
    "57": 1.5, // Negative
    "139": 2.5, // Held up
  },

  // Missed tackle (no sub-event)
  "43": -1,

  // Carries (no sub-event)
  "44": 1,

  // Turnover (no sub-event)
  "45": 3,

  // Penalties conceded (no sub-event)
  "46": -3,

  // Linebreak (no sub-event)
  "47": 3,

  // Score
  "49": {
    "42": -1, // Missed Conversion
    "43": 3, // Successful Drop Goal
    "44": 3, // Successful Penalty
    "60": 2, // Successful Conversion
    "61": -1, // Missed Penalty
    "62": 0, // Missed Drop Goal
    "66": 5, // Try
    "200": 0, // Penalty Try
  },

  // Lineout
  "50": {
    "40": 1, // Won
    "41": -1, // Lost
    "65": 2, // Stolen
  },

  // Scrum
  "51": {
    "38": 0, // Won
    "39": -2, // Lost
    "58": 2, // Stolen
  },

  // Card
  "55": {
    "45": -10, // Red
    "46": -5, // Yellow
  },

  // Incomplete Pass (no sub-event)
  "87": -2,

  // Pass (no sub-event)
  "91": 0.2,

  // Offload (no sub-event)
  "92": 1,

  // Lost ball in carry (no sub-event)
  "103": -2,

  // Visit in opponents 22 (no sub-event)
  "104": 0,

  // Kick for territory
  "105": {
    "158": 0, // Caught
    "159": -2, // Straight out
    "164": 2, // Retrieved
    "165": 2, // 50-22
    "166": 0, // Lineout
    "185": -2, // Dead Ball
    "186": 2, // Knocked On
    "202": -1, // Charged Down
    "340": 0, // Half time
    "341": 0, // Full Time
  },

  // Ruck Won (no sub-event)
  "108": 0,

  // Penalty Gain (no sub-event)
  "124": 0,

  // Step out (no sub-event)
  "129": -1,

  // Charge Down (no sub-event)
  "130": 1,

  // Restart
  "133": {
    "247": 0, // kick off reception won
    "248": -1, // kick off reception lost
    "249": 2, // kick off retrieval won
    "250": 0, // kick off retrieval lost
    "251": -2, // false kick off
    "252": 0, // goal line drop out reception won
    "253": -1, // goal line drop out reception lost
    "254": 2, // goal line drop out retrieval won
    "255": 0, // goal line drop out retrieval lost
    "256": -2, // goal line drop out straight out
    "257": 0, // 22 drop out reception won
    "258": -1, // 22 drop out reception lost
    "259": 2, // 22 drop out retrieval won
    "260": 0, // 22 drop out retrieval lost
    "261": -2, // 22 drop out straight out
  },

  // Maul (no sub-event)
  "146": 0,

  // Lineout throw
  "151": {
    "377": 1, // Front won
    "378": 1, // Middle won
    "379": 1, // Back won
    "380": -2, // Front lost
    "381": -2, // Middle lost
    "382": -2, // Back lost
    "391": 1, // Overthrow Won
    "392": -2, // Overthrow Lost
  },

  // Kick Reception (no sub-event)
  "158": 0,

  // Lineout Pass to Receiver (no sub-event)
  "162": 0,

  // Assist
  "179": {
    "451": 3, // Try Assist
    "452": 2, // Linebreak Assist
  },

  // Ruck Lost (no sub-event)
  "206": -2,

  // Tryline Held Up (no sub-event)
  "215": -1,
};

export const eventPoint7s: EventPoints = {
  // Forward pass (no sub-event)
  "36": -2,

  // Knock on (no sub-event)
  "35": -2,

  // Tackle
  "56": {
    "63": 2, // Positive
    "64": 1.5, // Negative
    "118": 2.5, // Held up
  },

  // Missed tackle (no sub-event)
  "57": -1,

  // Carries (no sub-event)
  "58": 1,

  // Turnover (no sub-event)
  "59": 3,

  // Penalties conceded (no sub-event)
  "60": -3,

  // Linebreak (no sub-event)
  "37": 3,

  // Score
  "33": {
    "69": -1, // Missed Conversion
    "71": 3, // Successful Drop Goal
    "53": 3, // Successful Penalty
    "52": 2, // Successful Conversion
    "70": -1, // Missed Penalty
    "72": 0, // Missed Drop Goal
    "51": 5, // Try
    "142": 0, // Penalty Try
  },

  // Lineout
  "62": {
    "40": 1, // Won
    "41": -1, // Lost
    "65": 2, // Stolen
  },

  // Scrum
  "63": {
    "47": 0, // Won
    "48": -2, // Lost
    "67": 2, // Stolen
  },

  // Card
  "66": {
    "55": -10, // Red
    "54": -5, // Yellow
  },

  // Incomplete Pass (no sub-event)
  "86": -2,

  // Pass (no sub-event)
  "82": 0.2,

  // Offload (no sub-event)
  "83": 1,

  // Lost ball in carry (no sub-event)
  "149": -2,

  // Visit in opponents 22 (no sub-event)
  "122": 0,

  // Kick for territory
  "106": {
    "160": 0, // Caught
    "161": -2, // Straight out
    "167": 2, // Retrieved
    "168": 2, // 50-22
    "169": 0, // Lineout
    "187": -2, // Dead Ball
    "188": 2, // Knocked On
    "203": -1, // Charged Down
    "342": 0, // Half time
    "343": 0, // Full Time
  },

  // Ruck Won (no sub-event)
  "109": 0,

  // Penalty Gain (no sub-event)
  "125": 0,

  // Step out (no sub-event)
  "128": -1,

  // Charge Down (no sub-event)
  "131": 1,

  // Restart
  "134": {
    "262": 0, // kick off reception won
    "263": -1, // kick off reception lost
    "264": 2, // kick off retrieval won
    "265": 0, // kick off retrieval lost
    "266": -2, // false kick off
    "267": 0, // goal line drop out reception won
    "268": -1, // goal line drop out reception lost
    "269": 2, // goal line drop out retrieval won
    "270": 0, // goal line drop out retrieval lost
    "271": -2, // goal line drop out straight out
    "272": 0, // 22 drop out reception won
    "273": -1, // 22 drop out reception lost
    "274": 2, // 22 drop out retrieval won
    "275": 0, // 22 drop out retrieval lost
    "276": -2, // 22 drop out straight out
  },

  // Maul (no sub-event)
  "147": 0,

  // Lineout throw
  "150": {
    "371": 1, // Front won
    "372": 1, // Middle won
    "373": 1, // Back won
    "374": -2, // Front lost
    "375": -2, // Middle lost
    "376": -2, // Back lost
    "389": 1, // Overthrow Won
    "390": -2, // Overthrow Lost
  },

  // Kick Reception (no sub-event)
  "158": 0,

  // Lineout Pass to Receiver (no sub-event)
  "163": 0,

  // Assist
  "180": {
    "447": 3, // Try Assist
    "448": 2, // Linebreak Assist
  },

  // Ruck Lost (no sub-event)
  "207": -2,

  // Tryline Held Up (no sub-event)
  // "215": -1,
};
