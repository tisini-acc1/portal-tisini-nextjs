import { getUserTeams } from "@/data/teams/user-teams";

import TeamsRouter from "./teams-router";

const TeamsPage = async () => {
  const data = await getUserTeams();

  return <TeamsRouter teams={data} />;
};

export default TeamsPage;
