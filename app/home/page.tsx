"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getUserRole } from "@/actions/actions";

const HomePage = () => {
  const [role, setRole] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchRole = async () => {
      const role = await getUserRole();
      setRole(role as string);
    };

    fetchRole();
  }, []);

  if (role === "1") {
    router.replace("/home/agents");
  } else if (role === "2") {
    router.replace("/home/teams");
  } else if (role === "5") {
    router.replace("/home/players");
  } else if (role === "6") {
    router.replace("/home/competitions");
  }
  return <div>HomePage</div>;
};

export default HomePage;
