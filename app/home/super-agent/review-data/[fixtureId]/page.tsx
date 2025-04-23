import { getFixtureStats } from "@/actions/php-actions";
import EventCard from "@/components/super-agent/event-card";
import React from "react";

type Props = {
  params: Promise<{ fixtureId: string }>;
};

const fetchFixData = async (id: string) => {
  const res = await fetch(
    `https://apis.tisini.co.ke/apiagent7.php?event=${id}`,
    { method: "GET" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch fixture data");
  }

  return res.json();
};

const ReviewDataPage = async ({ params }: Props) => {
  const { fixtureId } = await params;

  const data: Promise<FixtureData> = fetchFixData(fixtureId);
  const fixData = await data;

  const homeEvents = fixData.home;
  const awayEvents = fixData.away;

  const eventOrder = [
    "Goal",
    "Goal Conceded",
    "Assists",
    "Shot In-box",
    "Shot Out-box",
    "Blocks",
    "Cross Right",
    "Cross Left",
    "Box Carry",
    "Box Touch",
    "Chance",
    "Progress Pass",
    "Pass",
    "Incomplete Pass",
    "Ball",
    "Interceptions",
    "Corner",
    "Tackle",
    "Freekick",
    "Foul",
    "Penalty",
    "Card",
    "Offside",
    "Short GK",
    "Long GK",
    "Save",
    "Throw-out",
    "Kick-outs",
    "Run-outs",
    "Claims",
    "Clearances",
    "Dribbles",
    "Aerial Duels",
    "Substitute",
    "Throw in",
  ];

  console.log(fixData.home);

  return (
    <main>
      <section>
        <div className="max-w-3xl mx-auto p-4">
          <h1 className="text-2xl font-bold text-center mb-6">
            Match Statistics
          </h1>

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
  );
};

export default ReviewDataPage;
