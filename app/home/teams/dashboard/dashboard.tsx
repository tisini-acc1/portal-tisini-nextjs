"use client";

import { getVideoEvents } from "@/actions/php-actions";
import { useStore } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Loading from "../../loading";

type DashProps = {
  fixtures: TeamFixture[];
};

const Dashboard = ({ fixtures }: DashProps) => {
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

      console.log(result);
    }
  }, [team.id, data]);

  if (isLoading) {
    return <Loading />;
  }

  return <div>Dashboard</div>;
};

export default Dashboard;

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
