"use client";

import { Volleyball } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/lib/store";
import { getFixType, getOfficialsEvents } from "@/actions/php-actions";
import AddFixtureData from "../match-officials/fixtures/add-fixture-data";
import VerifyFixtureData from "../match-officials/fixtures/verify-fixture-data";
import Image from "next/image";

type DataProps = {
  homeId: string;
  home: Lineup[];
  away: Lineup[];
  fixEvents: RefEvents[];
};

const MatchDataSection = ({ homeId, home, away, fixEvents }: DataProps) => {
  const { store } = useStore((state) => state);

  const { data: fixTypes } = useQuery({
    queryKey: ["fixTypes"],
    queryFn: getFixType,
  });

  const selectedFixType = fixTypes?.find(
    (type) => type.type_code === store.refFix.fixture_type
  );

  const { data, isLoading } = useQuery({
    queryKey: ["refEvents", selectedFixType?.id],
    queryFn: () =>
      selectedFixType
        ? getOfficialsEvents(selectedFixType.id)
        : Promise.resolve({} as RefEventData),
    enabled: !!selectedFixType,
  });

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  // console.log(fixEvents);

  return (
    <section className="w-full space-y-6 bg-gray-100 p-3 rounded-md">
      <div className="flex justify-between items-center">
        <h1>
          <strong>Match Data</strong>
        </h1>

        <div className="flex gap-2">
          <VerifyFixtureData />
          <AddFixtureData
            homeP={home}
            awayP={away}
            refEvents={data?.refevent as RefEvent[]}
            fixType={selectedFixType?.id as string}
          />
        </div>
      </div>

      {fixEvents.length === 0 ? (
        <div className="flex items-center justify-center">
          No match data yet!
        </div>
      ) : (
        <div className="">
          {/* <FixtureDataMenu /> */}
          {fixEvents.map((item) => (
            <div key={item.id}>
              <RefDataCard data={item} homeId={homeId} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

type CardProps = { data: RefEvents; homeId: string };

const RefDataCard = ({ data, homeId }: CardProps) => {
  const img =
    data.subeventid === "60"
      ? "/conversion.png"
      : ["42", "62", "61"].includes(data.subeventid)
      ? "/missed.png"
      : ["43", "44", "200"].includes(data.subeventid)
      ? "/goal.png"
      : ["66"].includes(data.subeventid)
      ? "/rugby.jpg"
      : data.subeventid === "45"
      ? "/yellowcard.avif"
      : "/redcard.webp";

  return (
    <div className="p-2 font-semibold">
      {data.teamid === homeId ? (
        data.eventname === "Substitute" ? (
          <div className="flex items-center gap-1">
            {data.minute}&apos;
            <div>
              <div className="text-red-500 capitalize">
                {"⬇️"} {data.playername}
              </div>
              <div className="text-green-600 capitalize">
                {"⬆️"} {data.subplayername}
              </div>
            </div>
          </div>
        ) : data.eventname === "PM Penalties" ? (
          <div
            className={`${
              data.subeventname === "Scored" ? "text-green-600" : "text-red-500"
            } capitalize flex items-center gap-1`}
          >
            {data.minute}&apos; <Volleyball /> {data.playername}
          </div>
        ) : (
          <div className="capitalize flex items-center">
            {data.minute}&apos;{" "}
            <Image src={img} alt={data.eventname} width={25} height={25} />{" "}
            {data.playername}{" "}
            <span className="text-muted-foreground text-xs ml-1">
              {data.eventid === "52" ? data.eventname : data.subeventname}
            </span>
          </div>
        )
      ) : data.eventname === "Substitute" ? (
        <div className="flex items-center justify-end gap-1">
          <div>
            <div className="text-red-500 text-end capitalize">
              {data.playername} {"⬇️"}
            </div>
            <div className="text-green-600 text-end capitalize">
              {data.subplayername} {"⬆️"}
            </div>
          </div>
          {data.minute}&apos;
        </div>
      ) : data.eventname === "PM Penalties" ? (
        <div
          className={`${
            data.subeventname === "Scored" ? "text-green-600" : "text-red-500"
          } capitalize flex items-center justify-end gap-1`}
        >
          {data.playername} <Volleyball /> {data.minute}&apos;
        </div>
      ) : (
        <div className="flex justify-end items-center capitalize">
          <span className="text-muted-foreground text-xs mr-1">
            {data.eventid === "52" ? data.eventname : data.subeventname}
          </span>
          {data.playername}{" "}
          <Image src={img} alt={data.eventname} width={25} height={25} />{" "}
          {data.minute}&apos;
        </div>
      )}
    </div>
  );
};

export default MatchDataSection;
