"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const TeamsNavigation = ({ teamId }: { teamId: string }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(`/home/teams/players/${teamId}`);
  }, [router, teamId]);

  return null;
};

export default TeamsNavigation;
