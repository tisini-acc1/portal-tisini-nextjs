interface PassSequence {
  Team: string;
  Pass_Count: number;
  Next_Event: string;
  Player: string;
  Pass_Type: "Pass" | "Progressive Pass";
  Quarter: string;
  Minute: string;
  Second: string;
  Outcome?: "Positive" | "Negative" | "Neutral";
}

interface AnalysisResult {
  all_sequence: PassSequence[];
  event_enders: { Next_Event: string; Sequence_End_Count: number }[];
  player_enders: { Player: string; Next_Event: string; Count: number }[];
  outcome_counts: Record<string, number>;
  total_sequences?: number;
  cross_sequence?: PassSequence[];
  shot_sequence?: PassSequence[];
}

function abbreviateName(name: string | undefined | null): string {
  if (!name) return "";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}

export function passSequenceAnalysis(df: VideoEvent[]): AnalysisResult {
  // Create a copy of the input data
  const data: (VideoEvent & { is_pass?: boolean; Pass_Sequence?: number })[] =
    JSON.parse(JSON.stringify(df));

  // Define pass events
  data.forEach((item) => {
    item.is_pass =
      item.eventid === "7" || // Regular pass
      (item.eventid === "95" && item.subevent_id === "152"); // Progressive pass complete
  });

  // Calculate pass sequence groups
  let sequenceGroup = 0;
  data.forEach((item) => {
    if (!item.is_pass) {
      sequenceGroup++;
    }
    item.Pass_Sequence = sequenceGroup;
  });

  const sequences: PassSequence[] = [];
  let current_pass_count = 0;

  for (let i = 0; i < data.length - 1; i++) {
    if (data[i].is_pass) {
      current_pass_count++;
    } else {
      current_pass_count = 0;
    }

    const next_event_breaks = !data[i + 1].is_pass;

    if (data[i].is_pass && next_event_breaks) {
      // Get next event details
      const next_event = `${data[i + 1].event_name} ${
        data[i + 1].subeventname
      }`.trim();

      sequences.push({
        Team: data[i].team,
        Pass_Count: current_pass_count,
        Next_Event: next_event,
        Player: data[i].pname,
        Pass_Type:
          data[i].eventid === "95" && data[i].subevent_id === "152"
            ? "Progressive Pass"
            : "Pass",
        Quarter: data[i].quarter,
        Minute: data[i].game_minute,
        Second: data[i].game_second,
      });
      current_pass_count = 0;
    }
  }

  if (sequences.length === 0) {
    return {
      total_sequences: 0,
      all_sequence: [],
      event_enders: [],
      player_enders: [],
      outcome_counts: {},
      cross_sequence: [],
      shot_sequence: [],
    };
  }

  // Sort sequences by pass count
  const pass_analysis = sequences.sort((a, b) => b.Pass_Count - a.Pass_Count);

  // Abbreviate player names
  pass_analysis.forEach((item) => {
    item.Player = abbreviateName(item.Player);
  });

  // Outcome classification
  const positive_terms = [
    "Complete",
    "On Target",
    "Goal",
    "Box Carry",
    "Box Touch",
    "Foul 1/3",
    "Won",
  ];
  const negative_terms = [
    "Incomplete",
    "Offside",
    "Clearance",
    "Interception",
    "Out",
    "Lost",
    "Off Target",
  ];

  pass_analysis.forEach((item) => {
    item.Outcome = "Neutral";
    if (positive_terms.some((term) => item.Next_Event.includes(term))) {
      item.Outcome = "Positive";
    } else if (negative_terms.some((term) => item.Next_Event.includes(term))) {
      item.Outcome = "Negative";
    }
  });

  // Count event endings
  const eventEndCounts: Record<string, number> = {};
  pass_analysis.forEach((item) => {
    eventEndCounts[item.Next_Event] =
      (eventEndCounts[item.Next_Event] || 0) + 1;
  });
  const event_end_counts = Object.entries(eventEndCounts)
    .map(([Next_Event, Sequence_End_Count]) => ({
      Next_Event,
      Sequence_End_Count,
    }))
    .sort((a, b) => b.Sequence_End_Count - a.Sequence_End_Count);

  // Count player event endings
  const playerEventEnds: Record<string, number> = {};
  pass_analysis.forEach((item) => {
    const key = `${item.Player}|${item.Next_Event}`;
    playerEventEnds[key] = (playerEventEnds[key] || 0) + 1;
  });
  const player_event_ends = Object.entries(playerEventEnds)
    .map(([key, Count]) => {
      const [Player, Next_Event] = key.split("|");
      return { Player, Next_Event, Count };
    })
    .sort((a, b) => b.Count - a.Count);

  // Count outcomes
  const outcomeCounts: Record<string, number> = {};
  pass_analysis.forEach((item) => {
    const outcome = item.Outcome || "Neutral";
    outcomeCounts[outcome] = (outcomeCounts[outcome] || 0) + 1;
  });

  return {
    all_sequence: pass_analysis,
    event_enders: event_end_counts,
    player_enders: player_event_ends,
    outcome_counts: outcomeCounts,
  };
}
