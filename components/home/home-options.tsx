import { getTournaments } from "@/actions/php-actions";
import React from "react";
import SelectTournament from "../sidebar/select-tournament";

const HomeOptions = async () => {
  const tournaments = await getTournaments();
  return (
    <div>
      <SelectTournament tournaments={tournaments} />
    </div>
  );
};

export default HomeOptions;
