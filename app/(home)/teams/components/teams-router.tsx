"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";

import { createSlug } from "@/lib/utils";
import Loading from "../../../home/loading";
import { useTeamStore } from "@/store/team.store";

const TeamsRouter = ({ data }: { data: Promise<Team[]> }) => {
  const teams = use(data);

  const userTeam = useTeamStore((state) => state.store.userTeam);
  const router = useRouter();

  useEffect(() => {
    if (teams.length > 0) {
      if (userTeam.team_id) {
        const persistedTeam = teams.find(
          (team) => team.team_id === userTeam.team_id
        );

        if (persistedTeam) {
          const url = createSlug(userTeam.teamname);
          router.push(`/teams/${url}-${userTeam.team_id}`);
        }
      } else {
        const url = createSlug(teams[0].teamname);
        router.push(`/teams/${url}-${teams[0].team_id}`);
      }
    }
  }, [teams]);

  return <Loading />;
};

export default TeamsRouter;
