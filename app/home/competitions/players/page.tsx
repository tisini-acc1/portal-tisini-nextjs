import { getToken } from "@/actions/actions";
import axios from "axios";
import React from "react";

const PlayersPage = async () => {
  const token = await getToken();

  const getTournaments = async () => {
    try {
      const res = await axios.get(
        `https://backend.tisini.co.ke/api/tournaments/${token}/`
      );

      return res.data;
      // console.log("server", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const data: Promise<CompTeam[]> = getTournaments();
  const tournaments = await data;

  return (
    <>
      {tournaments.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </>
  );
};

export default PlayersPage;
