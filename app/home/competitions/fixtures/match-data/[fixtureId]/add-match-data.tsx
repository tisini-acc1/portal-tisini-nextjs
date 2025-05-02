"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import { useStore } from "@/store/store";
import { getFixType, getOfficialsEvents } from "@/actions/php-actions";
import { RefDataCard } from "@/components/shared/match-sheet/ref-data-card";
import AddFixtureData from "@/components/shared/match-sheet/add-fixture-data";
import VerifyFixtureData from "@/components/shared/match-sheet/verify-fixture-data";

type DataProps = {
  sheetData: MatchSheet;
  homeId: string;
};

const AddMatchData = ({ sheetData, homeId }: DataProps) => {
  const user = useStore((state) => state.store.user);
  const { store } = useStore((state) => state);

  const { data: fixTypes } = useQuery({
    queryKey: ["fixTypes"],
    queryFn: getFixType,
  });

  const fixture = sheetData.fixturedata[0];

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

  return (
    <main>
      <header className="bg-gray-50 shadow-sm sticky top-0 z-10 py-4 px-4">
        <div className="flex flex-col gap-4">
          {/* Match Info */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3 text-sm text-gray-600">
              <span className="font-medium bg-gray-100 px-2 py-1 rounded">
                {fixture.league}
              </span>
              <span>Matchday {fixture.matchday}</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                {fixture.game_status}
              </span>
            </div>

            <h1 className="text-2xl text-center font-bold">
              <span className="text-blue-600">{fixture.hometeam}</span>
              <span className="mx-2 text-gray-400">vs</span>
              <span className="text-red-600">{fixture.awayteam}</span>
            </h1>
          </div>

          {/* Admin Controls */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {format(new Date(fixture.game_date), "MMMM d, yyyy - h:mm a")}
            </div>

            {(user.role === "9" || user.role === "6") && (
              <div className="flex gap-3 flex-shrink-0">
                <VerifyFixtureData />
                <AddFixtureData
                  homeP={sheetData.hometeamlineup}
                  awayP={sheetData.awayteamlineup}
                  refEvents={data?.refevent as RefEvent[]}
                  fixType={selectedFixType?.id as string}
                />
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="pt-2">
        {sheetData.events.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-2xl">
            No match data yet!
          </div>
        ) : (
          <div className="space-y-2">
            {/* <FixtureDataMenu /> */}
            {sheetData.events.map((item) => (
              <div key={item.id}>
                <RefDataCard data={item} homeId={homeId} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default AddMatchData;
