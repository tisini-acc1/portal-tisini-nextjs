"use client";

import Image from "next/image";
import { useState } from "react";
import { EyeIcon } from "lucide-react";

// import { useStore } from "@/lib/store";
import FixCommentModal from "./fix-comment-modal";

const RefFixtureDetails = () => {
  // const { store } = useStore((state) => state);

  return (
    <section className="bg-gray-100 p-2 md:p-4 space-y-6 font-mono rounded-md">
      <div className="space-y-2">
        <strong>Match Officials</strong>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <RefreeCard title="Commissioner" />
          <RefreeCard title="Center Refree" />
          <RefreeCard title="1st Assistant Refree" />
          <RefreeCard title="2nd Assistant Refree" />
          <RefreeCard title="Reserve Refree" />
        </div>
      </div>

      <div className="p-2 space-y-2">
        <strong>Match Conditions</strong>
        <div className="flex flex-col md:flex-row gap-4 p-2 border bg-gray-50">
          <p className="lg:w-1/2">
            <strong>Weather:</strong>{" "}
            <span className="text-muted-foreground text-xs md:text-sm">
              Sunny
            </span>
          </p>

          <p>
            <strong>Pitch:</strong>{" "}
            <span className="text-muted-foreground text-xs md:text-sm">
              Good
            </span>
          </p>
        </div>
      </div>

      <div className="p-2 space-y-2">
        <div className="flex justify-between items-center">
          <strong>Match Comments</strong>

          <FixCommentModal />
        </div>

        <div className="border p-2 bg-gray-50">
          <p className="text-muted-foreground text-xs md:text-sm">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae
            eligendi quos hic doloribus at quis nihil rerum maxime praesentium,
            fugiat quisquam soluta ullam, libero officiis consectetur tempora
            deserunt quasi. Dolorum.
          </p>
        </div>
      </div>
    </section>
  );
};

type RefProps = {
  title: string;
};

const RefreeCard = ({ title }: RefProps) => {
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
