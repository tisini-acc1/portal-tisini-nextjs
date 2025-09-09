import TeamFilter from "./team-filter";
import { getUserRole } from "@/app/auth/actions";
import TournamentFilter from "./tournament-filter";

const Filter = async () => {
  const userRole = await getUserRole();

  if (userRole === "6") {
    return <TournamentFilter />;
  } else if (userRole === "2") {
    return <TeamFilter />;
  }

  return <div></div>;
};

export default Filter;
