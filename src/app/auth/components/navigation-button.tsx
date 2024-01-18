"use client";

import { useRouter } from "next/navigation";
import { ArrowBigRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const NavigationButton = ({ role }: { role: string }) => {
  const router = useRouter();

  return (
    <Button size="sm" onClick={() => router.push(`/auth/register/${role}`)}>
      Register <ArrowBigRight className="animate-ping h-4 w-4 ml-2" />
    </Button>
  );
};

export default NavigationButton;
