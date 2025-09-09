"use client";

import { useTeamData } from "@/hooks/use-team";

export function TeamDataProvider() {
  useTeamData();
  return null;
}
