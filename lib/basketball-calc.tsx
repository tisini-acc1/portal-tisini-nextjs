import { getEvent, getSubEvent } from "./utils";

export const playerBasketballStats = (data: Stats) => {
  const twoPoint = getSubEvent(data, "169", "434");
  const threePoint = getSubEvent(data, "169", "435");
  const freeThrow = getSubEvent(data, "169", "436");

  const total2point = twoPoint + getSubEvent(data, "175", "445");
  const total3point = threePoint + getSubEvent(data, "175", "444");
  const totalFreeThrow = freeThrow + getSubEvent(data, "175", "446");

  //   const percent2point = getPercent(total2point, twoPoint);
  //   const percent3point = getPercent(total3point, threePoint);
  //   const percentFreeThrow = getPercent(totalFreeThrow, freeThrow);

  const points = twoPoint * 2 + threePoint * 3 + freeThrow;

  const assists = getEvent(data, "172");
  const rebound = getEvent(data, "174");
  const blocks = getEvent(data, "171");
  const turnovers = getEvent(data, "176");
  const steals = getEvent(data, "173");
  const fouls = getEvent(data, "177");

  return {
    point: points,
    assist: assists,
    rebound: rebound,
    block: blocks,
    turnover: turnovers,
    steal: steals,
    foul: fouls,
    twoPoint: `${twoPoint} / ${total2point}`,
    threePoint: `${threePoint} / ${total3point}`,
    freeThrow: `${freeThrow} / ${totalFreeThrow}`,
  };
};
