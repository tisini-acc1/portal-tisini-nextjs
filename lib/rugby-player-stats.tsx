import { getEvent, getPercent, getSubEvent } from "./utils";

export const playerRugbyStats = (data: Stats) => {
  const tries = getSubEvent(data, "49", "66") + getSubEvent(data, "49", "200");

  const conversion = getSubEvent(data, "49", "60");
  const miss_conversion = getSubEvent(data, "49", "42");
  const succ_conversion = getPercent(conversion + miss_conversion, conversion);
  const missed_penalty = getSubEvent(data, "49", "61");
  const penalty = getSubEvent(data, "49", "44");
  const goalkicks = penalty + conversion;
  const total_goalkicks =
    penalty + conversion + missed_penalty + miss_conversion;
  const succ_goalkicks = getPercent(total_goalkicks, goalkicks);

  const assist = getEvent(data, "179");

  const carries = getEvent(data, "44");

  const linebreak = getEvent(data, "47");

  const offload = getEvent(data, "92");

  const comp_pass = getEvent(data, "91");
  const incom_pass = getEvent(data, "87");
  const forward_pass = getEvent(data, "40");
  const knock_on = getEvent(data, "41");
  const lost_in_carry = getEvent(data, "103");

  const hadling_errors = incom_pass + forward_pass + knock_on + lost_in_carry;
  const ball_handling = comp_pass + offload + carries;
  const handling = hadling_errors + ball_handling;
  const succ_handling = getPercent(handling, ball_handling);

  const handling_errors = `${handling} / ${hadling_errors}  ${succ_handling}`;
  const goal_kicks = `${total_goalkicks} / ${goalkicks}  ${succ_goalkicks}`;

  const missed_tackle = getEvent(data, "43");
  const tackles = getEvent(data, "42");
  const all_tackles = tackles + missed_tackle;
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

  const retained_kicks =
    getSubEvent(data, "105", "164") +
    getSubEvent(data, "105", "165") +
    getSubEvent(data, "105", "186");

  const kick_for_territory =
    getSubEvent(data, "105", "159") +
    getSubEvent(data, "105", "202") +
    getSubEvent(data, "105", "185");
  const Kicking_errors = kick_for_territory + getSubEvent(data, "133", "251");

  const ptackles = `${all_tackles} / ${tackles}  ${tackle_succ}%`;
  const cards = `${y_card} / ${r_card}`;
  const plineout_throw = `${lineout_throw} / ${lineout_won}  ${lineout_succ}`;
  const pscrum_won = `${scrums} / ${scrum_won}  ${scrum_succ}`;

  return {
    tries,
    goal_kicks,
    assist,
    linebreak,
    comp_pass,
    carries,
    offload,
    handling_errors,
    ptackles,
    turnover_won,
    penalties,
    cards,
    plineout_throw,
    lineout_steals,
    pscrum_won,
    retained_kicks,
    Kicking_errors,
  };
};
