"use client";

import Image from "next/image";

import { useStore } from "@/lib/store";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

const RefFixHeader = () => {
  const { store } = useStore((state) => state);

  const refFix = store.refFix;
  // const router = useRouter();

  return (
    <header className="bg-header rounded-md text-white font-bold font-mono">
      <div className="p-1 px-2 flex justify-between gap-2 text-xs font-mono overflow-hidden whitespace-nowrap">
        <p className="sm:w-3/4">{refFix.league}</p>
        <p className="sm:w-1/4 text-right">Round: {refFix.matchday}</p>
      </div>

      <div className="h-24 flex items-center">
        <div className="w-2/5 flex items-center justify-end">
          <div className="text-xs md:text-2xl text-right">
            {refFix.team1_name}
          </div>
          <div>
            <Image
              src="/homeLogo.png"
              alt="teamName"
              width={70}
              height={70}
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
              width={70}
              height={70}
              className="object-contain"
            />
          </div>
          <div className="text-xs md:text-2xl">{refFix.team2_name}</div>
        </div>
      </div>

      {/* <div className="p-1 px-2 flex justify-between items-center gap-2 text-xs font-mono overflow-hidden whitespace-nowrap">
        <div>
          <p className="sm:w-3/4">Weather: Sunny</p>
          <p className="sm:w-1/4 text-right">Pitch: Pathetic</p>
        </div>

        <div className="space-x-1">
          <Button size={"sm"}>Home</Button>
          <Button size={"sm"}>Away</Button>
        </div>
      </div> */}
    </header>
  );
};

export default RefFixHeader;
