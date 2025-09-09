import { getEvent, getPercent, getSubEvent } from "./utils";

export const playerRugbyStats = (data: Stats) => {
  const tries = getSubEvent(data, "49", "66") + getSubEvent(data, "49", "200");

  const conversion = getSubEvent(data, "49", "60");
  const miss_conversion = getSubEvent(data, "49", "42");
  // const succ_conversion = getPercent(conversion + miss_conversion, conversion);
  const missed_penalty = getSubEvent(data, "49", "61");
  const penalty = getSubEvent(data, "49", "44");
  const goalkicks = penalty + conversion;
  const total_goalkicks =
    penalty + conversion + missed_penalty + miss_conversion;
  const succ_goalkicks = getPercent(total_goalkicks, goalkicks);

  const assists = getEvent(data, "179");

  const carries = getEvent(data, "44");

  const linebreaks = getEvent(data, "47");

  const offloads = getEvent(data, "92");

  const passes = getEvent(data, "91");
  const incom_pass = getEvent(data, "87");
  const forward_pass = getEvent(data, "40");
  const knock_on = getEvent(data, "41");
  const lost_in_carry = getEvent(data, "103");

  const handling_errors = incom_pass + forward_pass + knock_on + lost_in_carry;
  const ball_handling = passes + offloads + carries;
  const handling = handling_errors + ball_handling;
  const succ_handling = getPercent(handling, ball_handling);

  const handling_efficiency = `${handling} / ${handling_errors}  ${succ_handling}%`;
  const goal_kicks = `${total_goalkicks} / ${goalkicks}  ${succ_goalkicks}%`;

  const missed_tackle = getEvent(data, "43");
  const tackles = getEvent(data, "42");
  const all_tackles = tackles + missed_tackle;
  const pos_tackle = getSubEvent(data, "42", "56");
  const tackle_dom = getPercent(tackles, pos_tackle);
  const tackle_succ = getPercent(all_tackles, tackles);

  const turnover_won = getEvent(data, "45");

  const penalties = getEvent(data, "46");

  const y_card = getSubEvent(data, "55", "46");
  const r_card = getSubEvent(data, "55", "45");

  const lineout_throw = getEvent(data, "151");
  const lineout_won =
    getSubEvent(data, "151", "377") +
    getSubEvent(data, "151", "378") +
    getSubEvent(data, "151", "379") +
    getSubEvent(data, "151", "391");

  const lineout_succ = getPercent(lineout_throw, lineout_won);

  const lineout_steals = getSubEvent(data, "50", "65");

  const scrums = getEvent(data, "51");
  const scrum_won = getSubEvent(data, "51", "38");
  const scrum_succ = getPercent(scrums, scrum_won);
  const scrum_steals = getSubEvent(data, "51", "58");

  const retained_kicks =
    getSubEvent(data, "105", "164") +
    getSubEvent(data, "105", "165") +
    getSubEvent(data, "105", "186");

  const kick_for_territory =
    getSubEvent(data, "105", "159") +
    getSubEvent(data, "105", "202") +
    getSubEvent(data, "105", "185");
  const Kicking_errors = kick_for_territory + getSubEvent(data, "133", "251");

  const restart_reception =
    getSubEvent(data, "133", "247") +
    getSubEvent(data, "133", "252") +
    getSubEvent(data, "133", "257");
  const restart_retrievals =
    getSubEvent(data, "133", "249") +
    getSubEvent(data, "133", "254") +
    getSubEvent(data, "133", "259");

  const rucks = getEvent(data, "206");
  const ruck_won = getSubEvent(data, "206", "524");
  const ruck_succ = getPercent(rucks, ruck_won);

  const tackle_success = `${tackles} / ${all_tackles}  ${tackle_succ}%`;
  const tackle_dominance = `${pos_tackle} / ${tackles}  ${tackle_dom}%`;
  const cards = `${y_card} / ${r_card}`;
  const lineout_throws = `${lineout_throw} / ${lineout_won}  ${lineout_succ}%`;
  const scrums_won = `${scrums} / ${scrum_won}  ${scrum_succ}%`;
  const ruck_contest = `${ruck_won} / ${rucks}  ${ruck_succ}%`;

  return {
    tries,
    assists,
    linebreaks,
    goal_kicks,
    passes,
    carries,
    offloads,
    handling_efficiency,

    tackle_success,
    tackle_dominance,
    turnover_won,

    lineout_throws,
    lineout_steals,
    scrums_won,
    scrum_steals,
    ruck_contest,

    restart_retrievals,
    restart_reception,
    retained_kicks,
    Kicking_errors,

    penalties,
    cards,
  };
};
