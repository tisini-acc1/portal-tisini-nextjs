import Loading from "@/app/home/loading";
import { eventOrder } from "@/app/home/super-agent/review-data/[fixtureId]/page";
import EventCard from "@/components/super-agent/event-card";
import { fetchFixData } from "@/lib/api";
import React, { Suspense } from "react";

type FixProps = {
  params: Promise<{ fixId: string }>;
};

const AgentFixturePage = async ({ params }: FixProps) => {
  const { fixId } = await params;

  const data: Promise<FixtureData> = fetchFixData(fixId);
  const fixData = await data;

  const homeEvents = fixData.home;
  const awayEvents = fixData.away;
  const fixture = fixData.fixture[0];

  console.log(fixData);

  return (
    <Suspense fallback={<Loading />}>
      <main className="">
        <header className="sticky top-0 z-50 bg-white shadow-md">
          <div className="bg-gray-800 text-white p-2">
            <h1 className="text-lg font-semibold text-center">Match Review</h1>
          </div>
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Home Team */}
              <div className="text-center w-1/3">
                <h2 className="text-xl font-bold text-blue-600 truncate">
                  {fixture.team1_name}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Agent:</span> {"N/A"}
                </p>
              </div>

              {/* Match Info (optional) */}
              <div className="text-center mx-4">
                <div className="text-xs text-gray-500">VS</div>
                <div className="text-sm font-medium mt-1">
                  {fixture.game_date &&
                    new Date(fixture.game_date).toLocaleDateString()}
                </div>
              </div>

              {/* Away Team */}
              <div className="text-center w-1/3">
                <h2 className="text-xl font-bold text-red-600 truncate">
                  {fixture.team2_name}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Agent:</span> {"N/A"}
                </p>
              </div>
            </div>
          </div>
        </header>

        <section>
          <div className=" mx-auto p-4">
            <div className="space-y-6">
              {eventOrder.map((eventName) => {
                const homeEvent = homeEvents[eventName];
                const awayEvent = awayEvents[eventName];

                // Only render if at least one team has this event
                if (homeEvent || awayEvent) {
                  return (
                    <EventCard
                      key={eventName}
                      homeEvent={homeEvent}
                      awayEvent={awayEvent}
                    />
                  );
                }
                return null;
              })}
            </div>
          </div>
        </section>
      </main>
    </Suspense>
  );
};

export default AgentFixturePage;
