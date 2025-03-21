"use client";

import Image from "next/image";
import { useState } from "react";
import { EyeIcon } from "lucide-react";

// import MatchSheetHeader from "@/components/match-sheet/match-sheet-header";
import RefFixHeader from "@/components/match-officials/fixtures/ref-fix-header";

const SingleFixturePage = () => {
  return (
    <main className="space-y-2">
      {/* <MatchSheetHeader /> */}
      <RefFixHeader />

      <section className="space-y-4">
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-4">
          <div className="space-y-2 col-span-6 border p-3 shadow-md rounded-md">
            <strong>Match Officials</strong>

            <div className=" grid grid-cols-2 lg:grid-cols-2 gap-4">
              <RefreeCard title="Commissioner" />
              <RefreeCard title="Center Refree" />
              <RefreeCard title="1st Assistant Refree" />
              <RefreeCard title="2nd Assistant Refree" />
              <RefreeCard title="Reserve Refree" />
            </div>
          </div>

          <div className="col-span-6 border shadow-md rounded-md p-4 space-y-4">
            <MatchComment />
            <MatchComment />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 grid-cols-1 gap-4">
          <div className="col-span-6 border p-3 shadow-md rounded-md">
            <div className="flex items-center justify-center">
              <strong className="text-center">Starting players</strong>
            </div>

            <div className="flex justify-between">
              <div>
                <LineupPlayer home={true} />
                <LineupPlayer home={true} />
                <LineupPlayer home={true} />
                <LineupPlayer home={true} />
                <LineupPlayer home={true} />
                <LineupPlayer home={true} />
                <LineupPlayer home={true} />
              </div>

              <div>
                <LineupPlayer home={false} />
                <LineupPlayer home={false} />
                <LineupPlayer home={false} />
                <LineupPlayer home={false} />
                <LineupPlayer home={false} />
                <LineupPlayer home={false} />
                <LineupPlayer home={false} />
              </div>
            </div>
          </div>

          <div className="col-span-6 border p-3 shadow-md rounded-md">
            <div className="flex items-center justify-center">
              <strong className="text-center">Substitutes</strong>
            </div>

            <div className="flex justify-between">
              <div>
                <LineupPlayer home={true} />
                <LineupPlayer home={true} />
                <LineupPlayer home={true} />
                <LineupPlayer home={true} />
                <LineupPlayer home={true} />
                <LineupPlayer home={true} />
                <LineupPlayer home={true} />
              </div>

              <div>
                <LineupPlayer home={false} />
                <LineupPlayer home={false} />
                <LineupPlayer home={false} />
                <LineupPlayer home={false} />
                <LineupPlayer home={false} />
                <LineupPlayer home={false} />
                <LineupPlayer home={false} />
              </div>
            </div>
          </div>
        </div>

        <div>Data</div>
      </section>
    </main>
  );
};

const LineupPlayer = ({ home }: { home: boolean }) => {
  return (
    <div className="p-1">
      {home ? (
        <div className="text-sm text-muted-foreground">15 John Doe</div>
      ) : (
        <div className="text-sm text-muted-foreground text-end">
          John Doe 15
        </div>
      )}
    </div>
  );
};

const MatchComment = () => {
  return (
    <div className="p-2 space-y-2">
      <div className="flex justify-between items-center">
        <strong>Other Comments</strong>
      </div>

      <div className="border h-28 p-2 bg-gray-50">
        <p className="text-muted-foreground text-xs md:text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime,
          obcaecati doloribus atque perspiciatis facere velit commodi molestias
          eligendi quisquam sapiente minima illo cumque sunt quaerat nostrum
          dolor? Veritatis, animi perferendis.
        </p>
      </div>
    </div>
  );
};

type RefProps = {
  title: string;
};

const RefreeCard = ({ title }: RefProps) => {
  const [blur, setBlur] = useState(true);

  return (
    <div className="border rounded-md p-1 pt-2 flex flex-col lg:flex-row gap-2 items-center bg-slate-50">
      <Image
        src={"/avatar.webp"}
        alt="profile"
        width={80}
        height={80}
        className="rounded-full object-contain"
      />
      <div className="flex flex-col lg:items-center text-xs md:text-sm font-mono">
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

export default SingleFixturePage;
