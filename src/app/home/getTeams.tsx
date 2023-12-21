"use client";

import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import useAxiosAuth from "@/lib/hooks/use-axios-auth";
import { useState } from "react";

const GetTeams = () => {
  const [teams, setTeams] = useState([]);
  const axiosAuth = useAxiosAuth();

  const fetchTeams = async () => {
    const res = await axiosAuth.get("/users/teams/");
    console.log(res);
    setTeams(res.data);
  };

  return (
    <>
      <Button onClick={() => fetchTeams()}>teams</Button>
      {teams && JSON.stringify(teams)}
    </>
  );
};

export default GetTeams;
