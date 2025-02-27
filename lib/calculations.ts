import { getEvent, getPercent, getSubEvent } from "./utils";

export const playerBallStats = (data: Stats) => {
  const passes = getEvent(data, "7");
  const prog_passes = getEvent(data, "95");

  const total_pass = passes + getEvent(data, "25") + prog_passes;

  const comp_prog_pass = getSubEvent(data, "95", "152");
  const comp_pass = passes + comp_prog_pass;

  const pct = getPercent(total_pass, comp_pass);
  const prog_pct = getPercent(prog_passes, comp_prog_pass);

  const assist = getEvent(data, "23");

  const box_touch = getEvent(data, "155");
  const box_carry = getEvent(data, "154");

  const cross = getEvent(data, "166") + getEvent(data, "159");
  const comp_cross =
    getSubEvent(data, "166", "426") + getSubEvent(data, "159", "413");
  const cross_acc = getPercent(cross, comp_cross);

  const goals = getEvent(data, "19");
  const shots = getEvent(data, "156") + getEvent(data, "165");
  const on_target =
    getSubEvent(data, "156", "405") + getSubEvent(data, "165", "422");

  const acc = getPercent(shots, on_target);
  //   const rate = getPercent(shots, goals);

  const chances =
    getEvent(data, "23") + getEvent(data, "98") + getEvent(data, "161");

  const inter_opp = getSubEvent(data, "28", "404");
  const inter_own = getSubEvent(data, "28", "403");
  // const intercept = inter_opp + inter_own;

  // const ball = getEvent(data, "67");
  const ball_won = getSubEvent(data, "67", "75");
  const ball_lost = getSubEvent(data, "67", "76");

  const aerial = getEvent(data, "93");
  const aerial_won = getSubEvent(data, "93", "144");
  // const aerial_lost = getSubEvent(data, "93", "143");

  // const ground = getEvent(data, "94");
  // const ground_won = getSubEvent(data, "94", "146");
  // const ground_lost = getSubEvent(data, "94", "145");

  const tackle = getEvent(data, "97");
  const tackle_won = getSubEvent(data, "97", "156");
  // const tackle_lost = getSubEvent(data, "97", "157");

  const blocks = getEvent(data, "27");
  const clearances = getEvent(data, "26");

  // const pos =
  //   ball_won +
  //   aerial_won +
  //   ground_won +
  //   tackle_won +
  //   blocks +
  //   tackle +
  //   intercept;
  const aerial_acc = getPercent(aerial, aerial_won);
  // const ground_acc = getPercent(ground, ground_won);
  const tackle_acc = getPercent(tackle, tackle_won);
  // const ball_acc = getPercent(ball, ball_won);

  const attempts =
    getEvent(data, "168") +
    getEvent(data, "167") +
    getEvent(data, "142") +
    getEvent(data, "68");
  const successful =
    getSubEvent(data, "168", "429") +
    getSubEvent(data, "167", "428") +
    getSubEvent(data, "142", "307") +
    getSubEvent(data, "68", "77");
  const dist_rate = getPercent(attempts, successful);

  const claim = getEvent(data, "69");
  const pos_claim =
    getSubEvent(data, "69", "80") + getSubEvent(data, "69", "81");
  const claim_rate = getPercent(claim, pos_claim);

  const save = getEvent(data, "24");

  const foul_won = getSubEvent(data, "11", "73");
  const foul_com = getSubEvent(data, "11", "74");

  const card_yellow = getSubEvent(data, "5", "21");
  const card_red = getSubEvent(data, "5", "22");

  const offside = getEvent(data, "10");

  const runout = getEvent(data, "32");
  const runout_s = getSubEvent(data, "32", "34");
  const runout_r = getPercent(runout, runout_s);

  const throwout = getEvent(data, "68");
  const throwout_s = getSubEvent(data, "68", "77");
  const throwout_r = getPercent(throwout, throwout_s);

  return {
    name: "",
    rating: "",
    goal: goals.toString(),
    assist: assist.toString(),
    chances: chances.toString(),
    offside: offside.toString(),
    "box-touch": box_touch.toString(),
    "box-carry": box_carry.toString(),
    shots: `${shots} / ${on_target}   ${acc}%`,
    crosses: `${cross} / ${comp_cross}   ${cross_acc}%`,
    pass: `${total_pass} / ${comp_pass}   ${pct}%`,
    "prog-pass": `${prog_passes} / ${comp_prog_pass}   ${prog_pct}%`,
    tackles: `${tackle} / ${tackle_won}   ${tackle_acc}`,
    "ball-efficiency": `${ball_lost} / ${ball_won}`,
    interception: `${inter_opp} / ${inter_own}`,
    clearance: clearances.toString(),
    blocks: blocks.toString(),
    aerial: `${aerial} / ${aerial_won}   ${aerial_acc}`,
    claims: `${claim} / ${pos_claim}   ${claim_rate}`,
    distribution: `${attempts}   ${dist_rate}`,
    saves: save.toString(),
    fouls: `${foul_won} / ${foul_com}`,
    cards: `${card_yellow} / ${card_red}`,
    runouts: `${runout} / ${runout_s}   ${runout_r}`,
    throwouts: `${throwout} / ${throwout_s}   ${throwout_r}`,
  };
};
