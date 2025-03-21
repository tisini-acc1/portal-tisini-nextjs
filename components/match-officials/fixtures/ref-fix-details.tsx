"use client";

import Image from "next/image";
import { useState } from "react";
import { EyeIcon } from "lucide-react";

// import { useStore } from "@/lib/store";
import FixCommentModal from "./fix-comment-modal";
import { useQuery } from "@tanstack/react-query";
import {
  getFixConditions,
  getPitchCond,
  getWeatherCond,
} from "@/actions/php-actions";
import { useStore } from "@/lib/store";

const RefFixtureDetails = () => {
  const { store } = useStore((state) => state);

  const { data, isLoading } = useQuery({
    queryKey: ["fixConditions", store.refFix.id],
    queryFn: () => getFixConditions(store.refFix.id),
  });

  const { data: wCond } = useQuery({
    queryKey: ["weatherConditions"],
    queryFn: () => getWeatherCond(),
  });

  const { data: pitchCond } = useQuery({
    queryKey: ["pitchConditions"],
    queryFn: () => getPitchCond(),
  });

  if (isLoading || !wCond || !pitchCond) {
    return (
      <div className="h-96 flex items-center justify-center">Loading...</div>
    );
  }

  // console.log(data);
  // console.log(pitchCond);

  return (
    <section className="space-y-6 mt-10 font-mono rounded-md grid grid-cols-1 lg:grid-cols-12 gap-4 bg-blue-300">
      <div className="col-span-4 bg-red-200 shadow-md">
        <strong>Match Conditions</strong>
        <div className="flex flex-col gap-4 p-2 border bg-gray-50">
          <p className="lg:w-1/2">
            <strong>Weather:</strong>{" "}
            <span className="text-muted-foreground text-xs md:text-sm">
              {data?.[0].weathertypename}
            </span>
          </p>

          <p>
            <strong>Pitch:</strong>{" "}
            <span className="text-muted-foreground text-xs md:text-sm">
              {data?.[0].pitchconditionname}
            </span>
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <strong>Match Comments</strong>

            <FixCommentModal wCond={wCond} pCond={pitchCond} />
          </div>

          <div className="border h-20 p-2 bg-gray-50">
            <p className="text-muted-foreground text-xs md:text-sm">
              {data?.[0].commisioner_comment}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

type RefProps = {
  title: string;
};

export const RefreeCard = ({ title }: RefProps) => {
  const [blur, setBlur] = useState(true);

  return (
    <div className="border rounded-md p-1 pt-2 flex flex-col gap-2 items-center bg-slate-50">
      <Image
        src={"/avatar.webp"}
        alt="profile"
        width={100}
        height={100}
        className="rounded-full object-contain"
      />
      <div className="flex flex-col items-center text-xs md:text-sm font-mono">
        <span className="">Michael Odiambo</span>
        <span className="text-muted-foreground">{title}</span>
        <span className="text-muted-foreground flex items-center gap-2">
          <span className={blur ? "blur-lg" : ""}>0700000000</span>
          <EyeIcon
            className="h-4 w-4 cursor-pointer"
            onClick={() => setBlur(!blur)}
          />{" "}
        </span>
      </div>
    </div>
  );
};

export default RefFixtureDetails;
