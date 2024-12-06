import { getUserRole } from "@/actions/actions";
import TournamentFilter from "./tournament-filter";

const Filter = async () => {
  const userRole = await getUserRole();

  if (userRole === "6") {
    return <TournamentFilter />;
  }

  return <div>FilterOptions</div>;
};

export default Filter;
