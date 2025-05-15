"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { useStore } from "@/store/store";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { getFixType, getOfficialsEvents } from "@/actions/php-actions";
import { RefDataCard } from "@/components/shared/match-sheet/ref-data-card";
import AddFixtureData from "@/components/shared/match-sheet/add-fixture-data";
import VerifyFixtureData from "@/components/shared/match-sheet/verify-fixture-data";

type DataProps = {
  sheetData: MatchSheet;
  homeId: string;
};

const AddMatchData = ({ sheetData, homeId }: DataProps) => {
  // const user = useStore((state) => state.store.user);
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

  const groupEvents = () => {
    const grpEvents: { [key: string]: RefEvents[] } = {};

    for (const item of sheetData.events) {
      const key = item.eventname;

      if (!grpEvents[key]) {
        grpEvents[key] = [];
      }

      grpEvents[key].push(item);
    }

    return grpEvents;
  };

  const groupedData = groupEvents();

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  // console.log(groupEvents());

  return (
    <main>
      <header className="sticky top-0 z-10 w-full border-b shadow-sm">
        <Card className="border-0 rounded-none shadow-none bg-gray-50">
          <CardContent className="p-4 space-y-3">
            {/* Top Section - League Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="font-medium text-sm px-3 py-1"
                >
                  {fixture.league}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Matchday {fixture.matchday}
                </span>
              </div>

              <Badge
                className={cn(
                  "px-3 py-1",
                  fixture.game_status.toLowerCase().includes("live")
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : fixture.game_status.toLowerCase().includes("upcoming")
                    ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                    : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                )}
              >
                {fixture.game_status}
              </Badge>
            </div>

            {/* Team Names */}
            <div className="py-2">
              <h1 className="text-center flex items-center justify-center gap-4 font-bold">
                <span className="text-2xl text-blue-600 hover:text-blue-800 transition-colors">
                  {fixture.hometeam}
                </span>
                <span className="text-lg text-muted-foreground font-normal">
                  vs
                </span>
                <span className="text-2xl text-red-600 hover:text-red-800 transition-colors">
                  {fixture.awayteam}
                </span>
              </h1>
            </div>

            <Separator className="my-2" />

            {/* Date and Admin Controls */}
            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {format(new Date(fixture.game_date), "MMMM d, yyyy - h:mm a")}
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <VerifyFixtureData />
                <AddFixtureData
                  homeP={sheetData.hometeamlineup}
                  awayP={sheetData.awayteamlineup}
                  refEvents={data?.refevent}
                  fixType={selectedFixType?.id as string}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </header>

      <section className="pt-2">
        {sheetData.events.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-2xl">
            No match data yet!
          </div>
        ) : (
          <div className="space-y-2">
            {/* <FixtureDataMenu /> */}
            {Object.entries(groupedData).map(([groupKey, items]) => {
              const homeData = items.filter((item) => item.teamid === homeId);
              const awayData = items.filter((item) => item.teamid !== homeId);

              return (
                <div
                  key={groupKey}
                  className="p-4 bg-gray-100 rounded-md space-y-3"
                >
                  <h3 className="font-medium font-mono text-center bg-white p-2 shadow-sm rounded-md">
                    {groupKey}s
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                    <div className="col-span-1 space-y-3">
                      {homeData.map((item) => (
                        <div key={item.id}>
                          <RefDataCard data={item} homeId={homeId} />
                        </div>
                      ))}
                    </div>

                    <div className="col-span-1 space-y-3">
                      {awayData.map((item) => (
                        <div key={item.id}>
                          <RefDataCard data={item} homeId={homeId} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default AddMatchData;
