import { getUserTeams } from "@/data/teams/user-teams";
import { Suspense } from "react";
import TeamsRouter from "./components/teams-router";

const TeamsPage = () => {
  const data = getUserTeams();

  return (
    <Suspense>
      <TeamsRouter data={data} />
    </Suspense>
  );
};

export default TeamsPage;
