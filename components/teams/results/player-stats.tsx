"use client";

import { footballRating } from "@/lib/rating";
import { getEvent, getSubEvent } from "@/lib/utils";

const PlayerStats = ({ data }: { data: TeamPlayerData }) => {
  const players = data.home;

  const pEvent = {
    name: "",
    rating: "",
    attack: {
      goal: "",
      assist: "",
      chances: "",
      "box-touch": "",
      "box-carry": "",
      shots: "",
      crosses: "",
      pass: "",
      "prog-pass": "",
    },
    defense: {
      tackles: "",
      "ball-efficiency": "",
      interception: "",
      clearance: "",
      blocks: "",
      aerial: "",
      fouls: "",
      cards: "",
    },
    gk: { claims: "", distribution: "", runouts: "", throwouts: "", saves: "" },
  };

  const pData: any = [];

  players.forEach((player) => {
    const pEvent = {
      name: "",
      rating: "",
      goal: "",
      assist: "",
      chances: "",
      "box-touch": "",
      "box-carry": "",
      shots: "",
      crosses: "",
      pass: "",
      "prog-pass": "",
      tackles: "",
      "ball-efficiency": "",
      interception: "",
      clearance: "",
      blocks: "",
      aerial: "",
      fouls: "",
      cards: "",
      claims: "",
      distribution: "",
      runouts: "",
      throwouts: "",
      saves: "",
    };

    const stats = player.pnameanddata;

    pEvent["name"] = player.pname;
    pEvent.rating = footballRating(stats).toString();

    pData.push(pEvent);
  });

  // const stats = players[9].pnameanddata;
  // console.log(stats);
  // console.log(getEvent(stats, "19"));
  // console.log(getSubEvent(stats, "67", "75"));
  console.log(pData);

  return <div>PlayerStatsstats</div>;
};

export default PlayerStats;
