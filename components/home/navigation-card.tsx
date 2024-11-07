"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const NavigationCard = ({ url }: { url: string }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(`/home/${url}`);
  }, [router, url]);

  return null;
};

export default NavigationCard;
