"use client";

import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const HeaderButton = ({ title, url }: { url: string; title: string }) => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push(`${url}`)}>
      <UserPlus className="mr-2 w-4 h-4" />
      {title}
    </Button>
  );
};

export default HeaderButton;
