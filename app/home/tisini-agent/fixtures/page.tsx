"use client";

import { useQuery } from "@tanstack/react-query";

import { columns } from "./columns";
import Loading from "../../loading";
import { useStore } from "@/store/store";
import { AgentFixturesTable } from "./agent-fixtures-table";
import { getSuperAgentFixtures } from "@/actions/php-actions";

const FixturesPage = () => {
  const user = useStore((state) => state.store.user);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["agentFixtures"],
    queryFn: () => getSuperAgentFixtures(),
  });

  console.log(user);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  return <AgentFixturesTable columns={columns} data={data as AgentFixture[]} />;
};

export default FixturesPage;
