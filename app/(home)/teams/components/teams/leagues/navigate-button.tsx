"use client";

import { PlusCircleIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const SubscibeButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Button onClick={() => router.push(`${pathname}/subscribe`)}>
      <PlusCircleIcon /> Register
    </Button>
  );
};

export default SubscibeButton;
