"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const NavigateButton = ({ path }: { path: string }) => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push(path)}>
      <Plus /> Add Tournament
    </Button>
  );
};

export default NavigateButton;
