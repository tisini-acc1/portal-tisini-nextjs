import { fetchFixData } from "@/lib/api";
import EventCard from "@/components/super-agent/event-card";
import AddCommentModal from "@/components/super-agent/comment-modal";

type Props = {
  params: Promise<{ fixtureId: string }>;
};

const ReviewDataPage = async ({ params }: Props) => {
  const { fixtureId } = await params;

  const data: Promise<FixtureData> = fetchFixData(fixtureId);
  const fixData = await data;

  const homeEvents = fixData.home;
  const awayEvents = fixData.away;
  const fixture = fixData.fixture[0];

  // console.log(fixData);

  return (
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
        <div className="grid md:grid-cols-12 gap-4 p-4">
          <div className="space-y-6 col-span-6">
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

          <div className="col-span-6 space-y-6">
            {/* Agent 1 Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">Agent 1</h3>

                <AddCommentModal />
              </div>

              <div className="p-4 space-y-3 text-gray-700">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Molestiae, laborum?
                </p>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Vitae, possimus!
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
                  blanditiis.
                </p>
              </div>
            </div>

            {/* Agent 2 Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">Agent 2</h3>

                <AddCommentModal />
              </div>

              <div className="p-4 space-y-3 text-gray-700">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Molestiae, laborum?
                </p>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Vitae, possimus!
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
                  blanditiis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export const eventOrder = [
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
