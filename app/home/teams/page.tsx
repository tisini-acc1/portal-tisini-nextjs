import { Suspense } from "react";

import Loading from "../loading";
// import { getTeamOverview } from "@/data/overview/overview";
// import TeamOverview from "@/app/(home)/teams/components/teams/overview/team-overview";

const TeamsPage = () => {
  // const data = getTeamOverview();

  return (
    <Suspense fallback={<Loading />}>
      {/* <TeamOverview overviewData={data} /> */}
    </Suspense>
  );
};

export default TeamsPage;
