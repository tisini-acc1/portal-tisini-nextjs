import { getEvent, getSubEvent } from "./utils";

export const footballRating = (data: Stats) => {
  const events = Object.values(data);
  let points = 0;

  events.forEach((event) => {
    const id = event.event_id;
    const subId = event["sub-event"][0]?.subeventid;

    // Attack
    if (id === "19") {
      points += getEvent(data, "19") * 5;
    } else if (id === "23") {
      points += getEvent(data, "23") * 3;
    } else if (id === "156") {
      points += getSubEvent(data, "156", "405") * 2;
    } else if (id === "165") {
      points += getSubEvent(data, "165", "422") * 2;
    } else if (id === "156") {
      points += getSubEvent(data, "156", "406") * 1;
    } else if (id === "165") {
      points += getSubEvent(data, "165", "423") * 1;
    } else if (id === "156") {
      points += getSubEvent(data, "156", "407") * 0.5;
    } else if (id === "165") {
      points += getSubEvent(data, "165", "424") * 0.5;
    } else if (id === "98") {
      points += getEvent(data, "98") * 2;
    } else if (id === "98") {
      points += getEvent(data, "161") * 2;
    } else if (id === "96" && subId === "154") {
      points += getSubEvent(data, "96", "154") * 1;
    } else if (id === "96" && subId === "155") {
      points += getSubEvent(data, "96", "155") * -0.5;
    } else if (id === "21" && subId === "398") {
      points += getSubEvent(data, "21", "398") * 2;
    } else if (id === "21" && subId === "397") {
      points += getSubEvent(data, "21", "397") * 0.5;
    } else if (id === "1" && subId === "150") {
      points += getSubEvent(data, "1", "150") * 3;
    } else if (id === "1" && subId === "304") {
      points += getSubEvent(data, "1", "304") * -3;
    } else if (id === "1" && subId === "151") {
      points += getSubEvent(data, "1", "151") * -3;
    } else if (id === "154") {
      points += getEvent(data, "154") * 0.5;
    } else if (id === "155") {
      points += getEvent(data, "155") * 0.5;
    } else if (id === "10") {
      points += getEvent(data, "10") * -0.5;
    }

    // Defensive
    if (id === "20") {
      points += getEvent(data, "20") * -5;
    } else if (id === "97" && subId === "157") {
      points += getSubEvent(data, "97", "157") * -0.5;
    } else if (id === "97" && subId === "156") {
      points += getSubEvent(data, "97", "156") * 1;
    } else if (id === "11" && subId === "73") {
      points += getSubEvent(data, "11", "73") * 0.5;
    } else if (id === "11" && subId === "74") {
      points += getSubEvent(data, "11", "74") * -0.5;
    } else if (id === "28" && subId === "403") {
      points += getSubEvent(data, "28", "403") * 0.75;
    } else if (id === "28" && subId === "404") {
      points += getSubEvent(data, "28", "404") * 1;
    } else if (id === "26") {
      points += getEvent(data, "26") * 1;
    } else if (id === "27") {
      points += getEvent(data, "27") * 2;
    } else if (id === "5" && subId === "21") {
      const count = getSubEvent(data, "5", "21");
      if (count > 1) {
        points += 1 * -2;
      } else {
        points += count * -2;
      }
    } else if (id === "5" && subId === "22") {
      points += getSubEvent(data, "5", "22") * -4;
    }

    // Duels
    if (id === "93" && subId === "144") {
      points += getSubEvent(data, "93", "144") * 0.5;
    } else if (id === "93" && subId === "143") {
      points += getSubEvent(data, "93", "143") * -0.5;
    } else if (id === "94" && subId === "146") {
      points += getSubEvent(data, "94", "146") * 0.5;
    } else if (id === "94" && subId === "145") {
      points += getSubEvent(data, "94", "145") * -0.5;
    }

    // Passing
    if (id === "12") {
      points += getEvent(data, "12") * 0.15;
    } else if (id === "7") {
      points += getEvent(data, "7") * 0.15;
    } else if (id === "25") {
      points += getEvent(data, "25") * -0.15;
    } else if (id === "95" && subId === "152") {
      points += getSubEvent(data, "95", "152") * 1;
    } else if (id === "95" && subId === "153") {
      points += getSubEvent(data, "95", "153") * -0.5;
    } else if (id === "67" && subId === "75") {
      points += getSubEvent(data, "67", "75") * 1;
    } else if (id === "67" && subId === "76") {
      points += getSubEvent(data, "67", "76") * -0.5;
    } else if (id === "166" && subId === "426") {
      points += getSubEvent(data, "166", "426") * 1;
    } else if (id === "166" && subId === "427") {
      points += getSubEvent(data, "166", "427") * 0.5;
    } else if (id === "166" && subId === "425") {
      points += getSubEvent(data, "166", "425") * 0.5;
    } else if (id === "159" && subId === "413") {
      points += getSubEvent(data, "159", "413") * 1;
    } else if (id === "159" && subId === "414") {
      points += getSubEvent(data, "159", "414") * 0.5;
    } else if (id === "159" && subId === "415") {
      points += getSubEvent(data, "159", "415") * 0.5;
    } else if (id === "3") {
      points += getEvent(data, "3") * 0.5;
    }

    // Goalkeeping
    if (id === "69" && subId === "80") {
      points += getSubEvent(data, "69", "79") * -1;
    } else if (id === "69" && subId === "80") {
      points += getSubEvent(data, "69", "80") * 1;
    } else if (id === "69" && subId === "81") {
      points += getSubEvent(data, "69", "81") * 0.75;
    } else if (id === "69" && subId === "82") {
      points += getSubEvent(data, "69", "82") * -0.5;
    } else if (id === "68" && subId === "77") {
      points += getSubEvent(data, "68", "77") * 0.5;
    } else if (id === "68" && subId === "78") {
      points += getSubEvent(data, "68", "78") * -0.5;
    } else if (id === "32" && subId === "34") {
      points += getSubEvent(data, "32", "34") * 1;
    } else if (id === "32" && subId === "35") {
      points += getSubEvent(data, "32", "35") * -0.5;
    } else if (id === "142" && subId === "307") {
      points += getSubEvent(data, "142", "307") * 1;
    } else if (id === "142" && subId === "308") {
      points += getSubEvent(data, "142", "308") * -0.5;
    } else if (id === "24" && subId === "20") {
      points += getSubEvent(data, "24", "20") * 1;
    } else if (id === "24" && subId === "19") {
      points += getSubEvent(data, "24", "19") * 4;
    } else if (id === "167" && subId === "428") {
      points += getSubEvent(data, "167", "428") * 0.25;
    } else if (id === "167" && subId === "430") {
      points += getSubEvent(data, "167", "430") * -0.25;
    } else if (id === "168" && subId === "429") {
      points += getSubEvent(data, "168", "429") * 0.25;
    } else if (id === "168" && subId === "431") {
      points += getSubEvent(data, "168", "431") * -0.25;
    }

    if (id === "31") {
      const goalsConceded = getEvent(data, "31");

      if (goalsConceded === 1) {
        points -= 1;
      } else if (goalsConceded >= 2 && goalsConceded <= 4) {
        points -= 2;
      } else if (goalsConceded > 4) {
        points -= 4;
      }
    }

    // console.log(events);
  });

  const rating = ((points / 45.05) * 5 + 5).toFixed(1);

  return rating;
};
