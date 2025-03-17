"use client";

import Image from "next/image";

import { useStore } from "@/lib/store";

const RefFixHeader = () => {
  const { store } = useStore((state) => state);

  const refFix = store.refFix;

  return (
    <div className="h-24 flex items-center text-white font-bold font-mono">
      <div className="w-2/5 flex items-center justify-end">
        <div className="text-xs md:text-2xl text-right">
          {refFix.team1_name}
        </div>
        <div>
          <Image
            src="/homeLogo.png"
            alt="teamName"
            width={90}
            height={90}
            className="object-contain"
          />
        </div>
      </div>
      <div className="w-1/5 flex items-center justify-center font-bold md:text-2xl text-xl">
        VS
      </div>
      <div className="w-2/5 flex items-center justify-start">
        <div>
          <Image
            src="/awayLogo.png"
            alt="teamName"
            width={90}
            height={90}
            className="object-contain"
          />
        </div>
        <div className="text-xs md:text-2xl">{refFix.team2_name}</div>
      </div>
    </div>
  );
};

export default RefFixHeader;
