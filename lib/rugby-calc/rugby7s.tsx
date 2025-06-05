import { getEvent, getPercent, getSubEvent } from "../utils";

export const playerRugbyStats7s = (data: Stats) => {
  const tries = getSubEvent(data, "33", "51") + getSubEvent(data, "33", "142");

  const conversion = getSubEvent(data, "33", "52");
  const miss_conversion = getSubEvent(data, "33", "69");
  // const succ_conversion = getPercent(conversion + miss_conversion, conversion);
  const missed_penalty = getSubEvent(data, "33", "70");
  const penalty = getSubEvent(data, "33", "53");
  const goalkicks = penalty + conversion;
  const total_goalkicks =
    penalty + conversion + missed_penalty + miss_conversion;
  const succ_goalkicks = getPercent(total_goalkicks, goalkicks);

  const assists = getEvent(data, "180");

  const carries = getEvent(data, "58");

  const linebreaks = getEvent(data, "37");

  const offloads = getEvent(data, "83");

  const passes = getEvent(data, "82");
  const incom_pass = getEvent(data, "86");
  const forward_pass = getEvent(data, "36");
  const knock_on = getEvent(data, "35");
  const lost_in_carry = getEvent(data, "149");

  const handling_errors = incom_pass + forward_pass + knock_on + lost_in_carry;
  const ball_handling = passes + offloads + carries;
  const handling = handling_errors + ball_handling;
  const succ_handling = getPercent(handling, ball_handling);

  const handling_efficiency = `${handling} / ${handling_errors}  ${succ_handling}%`;
  const goal_kicks = `${total_goalkicks} / ${goalkicks}  ${succ_goalkicks}%`;

  const missed_tackle = getEvent(data, "57");
  const tackles = getEvent(data, "56");
  const all_tackles = tackles + missed_tackle;
  const pos_tackle = getSubEvent(data, "56", "63");
  const tackle_succ = getPercent(all_tackles, tackles);
  const tackle_dom = getPercent(tackles, pos_tackle);

  const turnover_won = getEvent(data, "59");

  const penalties = getEvent(data, "60");

  const y_card = getSubEvent(data, "66", "54");
  const r_card = getSubEvent(data, "66", "55");

  const lineout_throw = getEvent(data, "150");
  const lineout_won =
    getSubEvent(data, "150", "371") +
    getSubEvent(data, "150", "372") +
    getSubEvent(data, "150", "373") +
    getSubEvent(data, "150", "389");

  const lineout_succ = getPercent(lineout_throw, lineout_won);

  const lineout_steals = getSubEvent(data, "62", "68");

  const scrums = getEvent(data, "63");
  const scrum_won = getSubEvent(data, "63", "47");
  const scrum_succ = getPercent(scrums, scrum_won);
  const scrum_steals = getSubEvent(data, "63", "67");

  const retained_kicks =
    getSubEvent(data, "106", "167") +
    getSubEvent(data, "106", "168") +
    getSubEvent(data, "106", "188");

  const kick_for_territory =
    getSubEvent(data, "106", "161") +
    getSubEvent(data, "106", "203") +
    getSubEvent(data, "106", "187");
  const Kicking_errors = kick_for_territory + getSubEvent(data, "134", "266");

  const restart_reception =
    getSubEvent(data, "134", "262") +
    getSubEvent(data, "134", "267") +
    getSubEvent(data, "134", "272");
  const restart_retrievals =
    getSubEvent(data, "134", "264") +
    getSubEvent(data, "134", "269") +
    getSubEvent(data, "134", "274");

  const rucks = getEvent(data, "207");
  const ruck_won = getSubEvent(data, "207", "526");
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
    goal_kicks,
    linebreaks,
    carries,
    offloads,
    passes,
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
