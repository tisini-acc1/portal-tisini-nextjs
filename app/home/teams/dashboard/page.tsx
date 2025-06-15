// "use client";

// import { useQuery } from "@tanstack/react-query";

// import Dashboard from "./dashboard";
// import Loading from "../../loading";
// import { useStore } from "@/store/store";
// import { getEvents, getTeamHistory } from "@/actions/php-actions";
// import { useEffect, useState } from "react";

// const DashboardPage = () => {
//   const [dashboardData, setDashboardData] = useState<TableData[]>([]);

//   const team = useStore((state) => state.store.team);
//   const fixType = team.teamType.toLowerCase();

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["teamHistory", team.id],
//     queryFn: () => getTeamHistory(team.id),
//   });

//   const { data: events } = useQuery({
//     queryKey: ["fixtureEvents", fixType],
//     queryFn: () => getEvents(fixType as string),
//   });

//   useEffect(() => {
//     const fixData: FixtureData[] = data;

//     if (fixData) {
//       for (const fixture of fixData) {
//         console.log(fixture.fixture[0]);

//         const matchData =
//           team.id === fixture.fixture[0].team1_id ? fixture.home : fixture.away;

//         console.log(matchData);
//       }
//     }
//   }, [data]);

//   // console.log(dashboardData);
//   // console.log(sampleData);

//   //  (fixture )

//   if (isLoading) {
//     return <Loading />;
//   }

//   if (isError) {
//     return <div>Error!</div>;
//   }

//   return <Dashboard />;
// };

// // Represents the data for a sub-event
// export interface SubEventData {
//   name: string;
//   [agentName: string]: number | string; // e.g., "FurahaGrace": number
// }

// // Represents an event with possible sub-events and agent totals
// export interface EventData {
//   event_id: string;
//   event_name: string;
//   subEvents: {
//     [subEventName: string]: SubEventData;
//   };
//   [agentName: string]:
//     | number
//     | string
//     | { [subEventName: string]: SubEventData };
// }

// // Represents the full dataset: a mapping of event IDs to event data
// export interface EventsData {
//   [eventId: string]: EventData;
// }

// type TableData = {
//   event_id: string;
//   event_name: string;
//   subEvents: TableSubevent[];
//   [agentName: string]: string | number | TableSubevent[];
// };

// type TableSubevent = {
//   name: string;
//   [agentName: string]: string | number;
// };

// const mergeAgentData = (data: FixtureData[], teamId: string): TableData[] => {
//   const merged = {} as EventsData;
//   console.log(data);
//   data?.forEach((fixture) => {
//     const matchData =
//       teamId === fixture.fixture[0].team1_id ? fixture.home : fixture.away;
//     const fixtureKey = fixture?.fixture?.[0]?.matchday;
//     console.log(fixture);
//     console.log(matchData);
//     Object.entries(matchData).forEach(([eventName, eventData]) => {
//       const key = eventData.event_id;

//       if (!merged[key]) {
//         merged[key] = {
//           event_id: eventData.event_id,
//           event_name: eventName,
//           subEvents: {},
//         };
//       }

//       merged[key][fixtureKey] = parseInt(eventData.total, 10) || 0;

//       if (Array.isArray(eventData["sub-event"])) {
//         eventData["sub-event"].forEach((sub) => {
//           const subKey = sub.subeventname;
//           if (!merged[key].subEvents[subKey]) {
//             merged[key].subEvents[subKey] = {
//               name: sub.subeventname,
//             };
//           }
//           merged[key].subEvents[subKey][fixtureKey] =
//             parseInt(sub.totalsubevent, 10) || 0;
//         });
//       }
//     });
//   });

//   // Filter out events where all agent totals are 0
//   const filteredEvents = Object.values(merged).filter((event) => {
//     // Get all agent properties (excluding event_id, event_name, subEvents)
//     const agentProperties = Object.keys(event).filter(
//       (key) => key !== "event_id" && key !== "event_name" && key !== "subEvents"
//     );

//     // Check if at least one agent has a non-zero value
//     return agentProperties.some((agent) => event[agent] !== 0);
//   });

//   // Also filter subEvents where all agent values are 0
//   const processedEvents = filteredEvents.map((event) => {
//     const filteredSubEvents = Object.fromEntries(
//       Object.entries(event.subEvents).filter(([, subEvent]) => {
//         const agentProperties = Object.keys(subEvent).filter(
//           (key) => key !== "name"
//         );
//         return agentProperties.some((agent) => subEvent[agent] !== 0);
//       })
//     );

//     return {
//       ...event,
//       subEvents: filteredSubEvents,
//     };
//   });

//   return processedEvents.map((event) => ({
//     ...event,
//     subEvents: Object.values(event.subEvents),
//   }));
// };

// export default DashboardPage;
import React from "react";

const page = () => {
  return <div>page</div>;
};

export default page;
