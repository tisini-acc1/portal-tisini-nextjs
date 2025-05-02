"use client";

import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/store/store";
import { RefDataCard } from "./ref-data-card";
import AddFixtureData from "./add-fixture-data";
import VerifyFixtureData from "./verify-fixture-data";
import { getFixType, getOfficialsEvents } from "@/actions/php-actions";

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
    (type) => type.type_code === store.sheetFix.fixType
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

  // console.log(fixTypes);
  // console.log(data);

  return (
    <section className="w-full space-y-6 bg-gray-100 p-3 rounded-md">
      <div className="flex justify-between items-center">
        <h1>
          <strong>Match Data</strong>
        </h1>

        {(store.user.role === "9" || store.user.role === "6") && (
          <div className="flex gap-2">
            <VerifyFixtureData />
            <AddFixtureData
              homeP={home}
              awayP={away}
              refEvents={data?.refevent as RefEvent[]}
              fixType={selectedFixType?.id as string}
            />
          </div>
        )}
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

export default MatchDataSection;
