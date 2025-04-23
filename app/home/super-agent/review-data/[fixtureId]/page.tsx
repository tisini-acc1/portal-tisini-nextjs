import EventCard from "@/components/super-agent/event-card";

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
  const fixture = fixData.fixture[0];

  // console.log(fixData.fixture);

  return (
    <main className="relative">
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
        <div className="max-w-3xl mx-auto p-4">
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

export default ReviewDataPage;
