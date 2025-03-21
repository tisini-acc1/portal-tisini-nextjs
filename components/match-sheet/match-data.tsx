"use client";

import { Volleyball } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/lib/store";
import {
  getFixRefEvents,
  getFixType,
  getOfficialsEvents,
} from "@/actions/php-actions";

import VerifyFixtureData from "../match-officials/fixtures/verify-fixture-data";
import AddFixtureData from "../match-officials/fixtures/add-fixture-data";

type DataProps = { homeId: string; home: Lineup[]; away: Lineup[] };

const MatchDataSection = ({ homeId, home, away }: DataProps) => {
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

  const { data: fixEvents } = useQuery({
    queryKey: ["refFixEvents", store.refFix.id],
    queryFn: () => getFixRefEvents(store.refFix.id),
  });

  if (isLoading || !data || !fixEvents) {
    return <div>Loading...</div>;
  }

  return (
    <section className="h-[450px] w-full space-y-6 bg-gray-100 p-3 rounded-md">
      <div className="flex justify-end gap-4">
        <VerifyFixtureData />
        <AddFixtureData
          homeP={home}
          awayP={away}
          refEvents={data?.refevent as RefEvent[]}
          fixType={selectedFixType?.id as string}
        />
      </div>

      <div className="">
        {/* <FixtureDataMenu /> */}
        {fixEvents.events.map((item) => (
          <div key={item.id}>
            <RefDataCard data={item} homeId={homeId} />
          </div>
        ))}
      </div>
    </section>
  );
};

type CardProps = { data: RefEvents; homeId: string };

const RefDataCard = ({ data, homeId }: CardProps) => {
  const icon =
    data.subeventname === "Red"
      ? "🟥"
      : data.eventname === "Card"
      ? "🟨"
      : data.eventname === "Goal" || data.eventname === "PM Penalties"
      ? "⚽"
      : data.eventname === "Conversion"
      ? "↔️"
      : data.eventname === "Score"
      ? "🏉"
      : "";

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
          <div className="capitalize">
            {data.minute}&apos; {icon} {data.playername}
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
        <div className="flex justify-end capitalize">
          {data.playername} {icon} {data.minute}&apos;
        </div>
      )}
    </div>
  );
};

export default MatchDataSection;
