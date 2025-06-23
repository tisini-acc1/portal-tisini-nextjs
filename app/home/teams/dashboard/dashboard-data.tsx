"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Loading from "../../loading";
import { useStore } from "@/store/store";
import { getVideoEvents } from "@/actions/php-actions";
import TeamDashboard from "@/components/teams/dashboard/team-dashboard";

type DashProps = {
  fixtures: TeamFixture[];
  // allEvents: EventType[] | undefined;
};

const DashboardData = ({ fixtures }: DashProps) => {
  const [teamData, setTeamData] = useState<TableData[]>([]);

  const team = useStore((state) => state.store.team);

  const { data, isLoading } = useQuery({
    queryKey: ["videoData", fixtures.map((f) => f.id), team.id],
    queryFn: async () => {
      // Limit concurrent requests if you have many fixtures
      const batchSize = 10;
      const allData = [];

      for (let i = 0; i < fixtures.length; i += batchSize) {
        const batch = fixtures.slice(i, i + batchSize);
        const batchResults = await Promise.all(
          batch.map((f) => getVideoEvents(f.id))
        );
        allData.push(...batchResults);
      }

      return allData;
    },
    enabled: fixtures.length > 0,
    staleTime: 60 * 1000, // Cache for 1 minute
  });

  useEffect(() => {
    if (data) {
      const result = processData(data, team.id);
      const tableData = transformToTableData(result);

      setTeamData(tableData);
    }
  }, [team.id, data]);

  // console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  return <TeamDashboard teamData={teamData} />;
};

export default DashboardData;

type GroupedEvent = {
  eventId: string;
  eventName: string;
  total: number;
  subEvents: SubEvent[] | [];
};

type SubEvent = {
  subevent_id: string;
  subeventName: string;
  subTotal: number;
};

type procData = { [key: string]: GroupedEvent[] };

function processData(data: VideoEvent[][], teamId: string): procData[] {
  const processedEvents: procData[] = [];

  data.forEach((teamEvents) => {
    const teamData = teamEvents
      ?.filter((item) => item.team === teamId)
      .sort((a, b) => parseInt(a.id) - parseInt(b.id));

    const groupedData: procData = {};
    const eventMap = new Map();
    let matchday = "";

    teamData.forEach((item) => {
      matchday = item.gameid;

      const eventId = item.eventid;
      const eventName = item.event_name;
      const subEventId = item.subevent_id;
      const subEventName = item.subeventname;

      // Initialize or update the event entry
      if (!eventMap.has(eventId)) {
        eventMap.set(eventId, {
          event_id: eventId,
          eventName: eventName,
          total: 0,
          sub_events: new Map(),
        });
      }

      const eventEntry = eventMap.get(eventId);
      eventEntry.total += 1;

      // Process sub-event if it exists (non-empty subevent_id)
      if (subEventId && subEventId.trim() !== "") {
        if (!eventEntry.sub_events.has(subEventId)) {
          eventEntry.sub_events.set(subEventId, {
            subevent_id: subEventId,
            subeventName: subEventName.trim() || "Unnamed",
            subTotal: 0,
          });
        }

        const subEventEntry = eventEntry.sub_events.get(subEventId);
        subEventEntry.subTotal += 1;
      }
    });

    const result: GroupedEvent[] = Array.from(eventMap.values()).map(
      (event) => ({
        eventId: event.event_id,
        eventName: event.eventName,
        total: event.total,
        subEvents: Array.from(event.sub_events.values()),
      })
    );

    groupedData[matchday] = result;

    processedEvents.push(groupedData);
  });

  return processedEvents;
}

type TableData = {
  event_id: string;
  event_name: string;
  subEvents: TableSubevent[];
  [agentName: string]: string | number | TableSubevent[];
};

type TableSubevent = {
  name: string;
  [agentName: string]: string | number;
};

function transformToTableData(
  fixtureData: Array<Record<string, GroupedEvent[]>>
): TableData[] {
  // First, collect all unique events and subevents across all fixtures
  const allEvents = new Map<
    string,
    { name: string; subEvents: Map<string, string> }
  >();
  const fixtureIds: string[] = [];

  // Process each fixture to gather all possible events and subevents
  fixtureData.forEach((fixture) => {
    const [fixtureId, events] = Object.entries(fixture)[0];
    fixtureIds.push(fixtureId);

    events.forEach((event) => {
      if (!allEvents.has(event.eventId)) {
        allEvents.set(event.eventId, {
          name: event.eventName,
          subEvents: new Map(),
        });
      }

      // Add all subevents for this event
      event.subEvents.forEach((subEvent) => {
        const eventEntry = allEvents.get(event.eventId)!;
        if (!eventEntry.subEvents.has(subEvent.subevent_id)) {
          eventEntry.subEvents.set(subEvent.subevent_id, subEvent.subeventName);
        }
      });
    });
  });

  // Now build the table data structure
  const tableData: TableData[] = [];

  allEvents.forEach((eventInfo, eventId) => {
    const eventRow: TableData = {
      event_id: eventId,
      event_name: eventInfo.name,
      subEvents: [],
    };

    // Initialize fixture columns for the event totals
    fixtureIds.forEach((fixtureId) => {
      eventRow[fixtureId] = 0; // Default to 0, will be updated if data exists
    });

    // Process subevents for this event
    eventInfo.subEvents.forEach((subEventName) => {
      // Removed unused subEventId parameter
      const subEventRow: TableSubevent = {
        name: subEventName,
      };

      // Initialize fixture columns for the subevent totals
      fixtureIds.forEach((fixtureId) => {
        subEventRow[fixtureId] = 0; // Default to 0
      });

      eventRow.subEvents.push(subEventRow);
    });

    tableData.push(eventRow);
  });

  // Now populate with actual data from fixtures
  fixtureData.forEach((fixture) => {
    const [fixtureId, events] = Object.entries(fixture)[0];

    events.forEach((event) => {
      const eventRow = tableData.find((row) => row.event_id === event.eventId);
      if (eventRow) {
        // Set the event total for this fixture
        eventRow[fixtureId] = event.total;

        // Set subevent totals for this fixture
        event.subEvents.forEach((subEvent) => {
          const subEventRow = eventRow.subEvents.find(
            (se) => se.name === subEvent.subeventName
          );
          if (subEventRow) {
            subEventRow[fixtureId] = subEvent.subTotal;
          }
        });
      }
    });
  });

  return tableData;
}
