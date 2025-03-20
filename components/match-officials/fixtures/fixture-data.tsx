"use client";

import { Volleyball } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/lib/store";
import AddFixtureData from "./add-fixture-data";
import {
  getFixRefEvents,
  getFixType,
  getOfficialsEvents,
} from "@/actions/php-actions";
import VerifyFixtureData from "./verify-fixture-data";

type Props = {
  home: Lineup[];
  away: Lineup[];
  homeId: string;
};

const FixtureData = ({ home, away, homeId }: Props) => {
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

  // console.log(selectedFixType);
  // console.log(store.refFix.fixture_type);
  console.log(fixEvents);

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

type CardProps = { data: RefData; homeId: string };

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

// const HighlightsCard = ({
//   highlight,
// }: {
//   highlight: RefData;
// }) => {
//   const homeId = teams.team1_id;

//   const icon =
//     highlight.subeventName === "Red"
//       ? "🟥"
//       : highlight.eventname === "Card"
//       ? "🟨"
//       : highlight.event_name === "Goal" ||
//         highlight.event_name === "PM Penalties"
//       ? "⚽"
//       : highlight.event_name === "Conversion"
//       ? "↔️"
//       : highlight.event_name === "Score"
//       ? "🏉"
//       : "";

//   return (
//     <div className="p-2 font-semibold">
//       {highlight.team === homeId ? (
//         highlight.event_name === "Substitute" ? (
//           <div className="flex items-center gap-1">
//             {highlight.game_minute}'
//             <div>
//               <div className="text-red-500 capitalize">
//                 {"⬇️"} {highlight.pname}
//               </div>
//               <div className="text-green-600 capitalize">
//                 {"⬆️"} {highlight.subplayername}
//               </div>
//             </div>
//           </div>
//         ) : highlight.event_name === "PM Penalties" ? (
//           <div
//             className={`${
//               highlight.subeventName === "Scored"
//                 ? "text-green-600"
//                 : "text-red-500"
//             } capitalize flex items-center gap-1`}
//           >
//             {highlight.game_minute}' <Volleyball /> {highlight.pname}
//           </div>
//         ) : (
//           <div className="capitalize">
//             {highlight.game_minute}' {icon} {highlight.pname}
//           </div>
//         )
//       ) : highlight.event_name === "Substitute" ? (
//         <div className="flex items-center justify-end gap-1">
//           <div>
//             <div className="text-red-500 text-end capitalize">
//               {highlight.pname} {"⬇️"}
//             </div>
//             <div className="text-green-600 text-end capitalize">
//               {highlight.subplayer_name} {"⬆️"}
//             </div>
//           </div>
//           {highlight.game_minute}'
//         </div>
//       ) : highlight.event_name === "PM Penalties" ? (
//         <div
//           className={`${
//             highlight.subeventName === "Scored"
//               ? "text-green-600"
//               : "text-red-500"
//           } capitalize flex items-center justify-end gap-1`}
//         >
//           {highlight.pname} <Volleyball /> {highlight.game_minute}'
//         </div>
//       ) : (
//         <div className="flex justify-end capitalize">
//           {highlight.pname} {icon} {highlight.game_minute}'
//         </div>
//       )}
//     </div>
//   );
// };

export default FixtureData;
