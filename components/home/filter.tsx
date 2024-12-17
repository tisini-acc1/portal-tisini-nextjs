import { getUserRole } from "@/actions/actions";
import TournamentFilter from "./tournament-filter";
import TeamFilter from "./team-filter";

const Filter = async () => {
  const userRole = await getUserRole();

  if (userRole === "6") {
    return <TournamentFilter />;
  } else if (userRole === "2") {
    return <TeamFilter />;
  }

  return <div>FilterOptions</div>;
};

export default Filter;
