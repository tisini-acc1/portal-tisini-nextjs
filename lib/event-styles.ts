type EventStyleConfig = {
  emoji: string;
  colorClass: string;
  textClass: string;
};

const EVENT_STYLES: Record<string, EventStyleConfig> = {
  // Football Events
  "19": {
    // Goal
    emoji: "⚽",
    colorClass: "bg-green-100 border-green-300",
    textClass: "text-green-800",
  },
  "31": {
    // Goal Conceded
    emoji: "⚽",
    colorClass: "bg-red-100 border-red-300",
    textClass: "text-red-800",
  },
  "24": {
    // Save
    emoji: "🧤",
    colorClass: "bg-blue-100 border-blue-300",
    textClass: "text-blue-800",
  },
  "7": {
    // Pass
    emoji: "↗️",
    colorClass: "bg-purple-100 border-purple-300",
    textClass: "text-purple-800",
  },
  "97": {
    // Tackle
    emoji: "👟",
    colorClass: "bg-yellow-100 border-yellow-300",
    textClass: "text-yellow-800",
  },
  "11": {
    // Foul
    emoji: "🚫",
    colorClass: "bg-red-100 border-red-300",
    textClass: "text-red-800",
  },
  "5": {
    // Card
    emoji: "🟨",
    colorClass: "bg-orange-100 border-orange-300",
    textClass: "text-orange-800",
  },
  "3": {
    // Corner
    emoji: "🚩",
    colorClass: "bg-indigo-100 border-indigo-300",
    textClass: "text-indigo-800",
  },
  "165": {
    // Shot In-box
    emoji: "🥅",
    colorClass: "bg-blue-100 border-blue-300",
    textClass: "text-blue-800",
  },
  "23": {
    // Assists
    emoji: "🎯",
    colorClass: "bg-teal-100 border-teal-300",
    textClass: "text-teal-800",
  },
  "20": {
    // OG
    emoji: "⚽",
    colorClass: "bg-red-100 border-red-300",
    textClass: "text-red-800",
  },
  "26": {
    // Clearances
    emoji: "🚀",
    colorClass: "bg-blue-100 border-blue-300",
    textClass: "text-blue-800",
  },
  "28": {
    // Interceptions
    emoji: "✋",
    colorClass: "bg-green-100 border-green-300",
    textClass: "text-green-800",
  },

  // Rugby Events
  "44": {
    // Carries
    emoji: "🏃",
    colorClass: "bg-blue-100 border-blue-300",
    textClass: "text-blue-800",
  },
  "49": {
    // Score
    emoji: "🏉",
    colorClass: "bg-green-100 border-green-300",
    textClass: "text-green-800",
  },
  "105": {
    // Kick for territory
    emoji: "🦵",
    colorClass: "bg-purple-100 border-purple-300",
    textClass: "text-purple-800",
  },
  "46": {
    // Penalties conceded
    emoji: "🤚",
    colorClass: "bg-red-100 border-red-300",
    textClass: "text-red-800",
  },
  "47": {
    // Linebreak
    emoji: "⚡",
    colorClass: "bg-yellow-100 border-yellow-300",
    textClass: "text-yellow-800",
  },
  "51": {
    // Scrum
    emoji: "🟢",
    colorClass: "bg-gray-100 border-gray-300",
    textClass: "text-gray-800",
  },
  "45": {
    // Turnover
    emoji: "🔄",
    colorClass: "bg-orange-100 border-orange-300",
    textClass: "text-orange-800",
  },
  "92": {
    // Offload
    emoji: "➡️",
    colorClass: "bg-teal-100 border-teal-300",
    textClass: "text-teal-800",
  },
  "50": {
    // Lineout
    emoji: "👥",
    colorClass: "bg-indigo-100 border-indigo-300",
    textClass: "text-indigo-800",
  },
  "108": {
    // Ruck Won
    emoji: "🏆",
    colorClass: "bg-green-100 border-green-300",
    textClass: "text-green-800",
  },
  "146": {
    // Maul
    emoji: "👊",
    colorClass: "bg-amber-100 border-amber-300",
    textClass: "text-amber-800",
  },
  "179": {
    // Assist
    emoji: "🎯",
    colorClass: "bg-teal-100 border-teal-300",
    textClass: "text-teal-800",
  },
  "42": {
    // Tackle
    emoji: "🛑",
    colorClass: "bg-yellow-100 border-yellow-300",
    textClass: "text-yellow-800",
  },
  "55": {
    // Card
    emoji: "🟥",
    colorClass: "bg-red-100 border-red-300",
    textClass: "text-red-800",
  },

  // Default
  default: {
    emoji: "📊",
    colorClass: "bg-gray-100 border-gray-300",
    textClass: "text-gray-800",
  },
};

export const getEventStyle = (eventId: string): EventStyleConfig => {
  return EVENT_STYLES[eventId] || EVENT_STYLES.default;
};
