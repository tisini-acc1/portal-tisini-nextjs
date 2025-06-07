"use client";

import { useStore } from "@/store/store";
import React from "react";

const Dashboard = () => {
  const fix = useStore((state) => state.store.team);

  console.log(fix.teamType.toLowerCase());

  return <div>Dashboard</div>;
};

export default Dashboard;
