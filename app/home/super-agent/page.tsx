import { getTeamHistory } from "@/actions/php-actions";
import React from "react";

const TisiniAdminPage = async () => {
  const data = await getTeamHistory("657");

  console.log(data);

  return <div>TisiniAdminPage</div>;
};

export default TisiniAdminPage;
