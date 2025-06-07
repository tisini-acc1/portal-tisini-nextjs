"use client";

import { getEvents, getTeamHistory } from "@/actions/php-actions";
import Dashboard from "./dashboard";
import { useStore } from "@/store/store";
import { useQuery } from "@tanstack/react-query";

const DashboardPage = () => {
  const team = useStore((state) => state.store.team);
  const fixType = team.teamType.toLowerCase();

  const { data } = useQuery({
    queryKey: ["teamHistory", team.id],
    queryFn: () => getTeamHistory(team.id),
  });

  const { data: events, isLoading: eLoading } = useQuery({
    queryKey: ["fixtureEvents", fixType],
    queryFn: () => getEvents(fixType as string),
  });

  console.log(events);
  console.log(data);

  return <Dashboard />;
};

export default DashboardPage;
