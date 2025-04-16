import { getPlayersData } from "@/actions/php-actions";
import React from "react";

const SingleFixturePage = async () => {
  const data = await getPlayersData("6845");

  console.log(data);

  return <div>SingleFixturePage</div>;
};

export default SingleFixturePage;
