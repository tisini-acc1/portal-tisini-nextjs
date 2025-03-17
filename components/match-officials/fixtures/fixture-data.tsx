import { Volleyball } from "lucide-react";
import FixtureDataMenu from "./fixture-data-menu";

const FixtureData = () => {
  return (
    <section className="h-[450px] w-full space-y-6 bg-gray-100 p-3 rounded-md relative">
      <div></div>

      <div className="absolute bottom-0 right-0">
        <FixtureDataMenu />
      </div>
    </section>
  );
};

const HighlightsCard = ({
  highlight,
  teams,
}: {
  highlight: GameHighlights;
  teams: FixtureDetails;
}) => {
  const homeId = teams.team1_id;

  const icon =
    highlight.subeventName === "Red"
      ? "🟥"
      : highlight.event_name === "Card"
      ? "🟨"
      : highlight.event_name === "Goal" ||
        highlight.event_name === "PM Penalties"
      ? "⚽"
      : highlight.event_name === "Conversion"
      ? "↔️"
      : highlight.event_name === "Score"
      ? "🏉"
      : "";

  return (
    <div className="p-2 font-semibold">
      {highlight.team === homeId ? (
        highlight.event_name === "Substitute" ? (
          <div className="flex items-center gap-1">
            {highlight.game_minute}'
            <div>
              <div className="text-red-500 capitalize">
                {"⬇️"} {highlight.pname}
              </div>
              <div className="text-green-600 capitalize">
                {"⬆️"} {highlight.subplayer_name}
              </div>
            </div>
          </div>
        ) : highlight.event_name === "PM Penalties" ? (
          <div
            className={`${
              highlight.subeventName === "Scored"
                ? "text-green-600"
                : "text-red-500"
            } capitalize flex items-center gap-1`}
          >
            {highlight.game_minute}' <Volleyball /> {highlight.pname}
          </div>
        ) : (
          <div className="capitalize">
            {highlight.game_minute}' {icon} {highlight.pname}
          </div>
        )
      ) : highlight.event_name === "Substitute" ? (
        <div className="flex items-center justify-end gap-1">
          <div>
            <div className="text-red-500 text-end capitalize">
              {highlight.pname} {"⬇️"}
            </div>
            <div className="text-green-600 text-end capitalize">
              {highlight.subplayer_name} {"⬆️"}
            </div>
          </div>
          {highlight.game_minute}'
        </div>
      ) : highlight.event_name === "PM Penalties" ? (
        <div
          className={`${
            highlight.subeventName === "Scored"
              ? "text-green-600"
              : "text-red-500"
          } capitalize flex items-center justify-end gap-1`}
        >
          {highlight.pname} <Volleyball /> {highlight.game_minute}'
        </div>
      ) : (
        <div className="flex justify-end capitalize">
          {highlight.pname} {icon} {highlight.game_minute}'
        </div>
      )}
    </div>
  );
};

export default FixtureData;
