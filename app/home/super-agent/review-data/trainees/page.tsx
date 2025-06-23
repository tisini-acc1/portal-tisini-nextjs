"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronRight } from "lucide-react";

import { useStore } from "@/store/store";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchFixData } from "@/lib/api";

const ReviewTraineesPage = () => {
  const fixtures = useStore((state) => state.store.reviewFixtures);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (eventId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(eventId)) {
      newExpanded.delete(eventId);
    } else {
      newExpanded.add(eventId);
    }
    setExpandedRows(newExpanded);
  };

  const { data } = useQuery<FixtureData[]>({
    queryKey: ["trainee-fixtures", fixtures.map((f) => f.fixture)],
    queryFn: async () => {
      const allData = Promise.all(fixtures.map((f) => fetchFixData(f.fixture)));
      return allData;
    },
    enabled: fixtures.length > 0,
  });

  const sampleData = mergeAgentData(data as FixtureData[], false);
  const agentNames = getAgentNames(sampleData);
  // console.log(sampleData);

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-150">
            <TableHead className="font-bold text-green-800 w-16"></TableHead>
            <TableHead className="font-bold text-green-800">Event</TableHead>
            <TableHead className="font-bold text-green-800">
              Sub-Event
            </TableHead>
            {agentNames.map((agent) => (
              <TableHead
                key={agent}
                className="font-bold text-green-800 text-center"
              >
                {agent.split(/(?=[A-Z])/).join(" ")}{" "}
                {/* Convert camelCase to normal name */}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((event) => (
            <>
              <TableRow
                key={event.event_id}
                className="bg-white hover:bg-gray-50 transition-colors cursor-pointer border-b-2 border-gray-100"
                onClick={() => toggleRow(event.event_id)}
              >
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-green-100"
                  >
                    {expandedRows.has(event.event_id) ? (
                      <ChevronDown className="h-4 w-4 text-green-600" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-green-600" />
                    )}
                  </Button>
                </TableCell>
                <TableCell className="font-semibold text-gray-800">
                  {event.event_name}
                </TableCell>
                <TableCell className="text-gray-500">-</TableCell>
                {agentNames.map((agent) => {
                  const value = (event as TableData)[agent];
                  return (
                    <TableCell
                      key={`${event.event_id}-${agent}`}
                      className="text-center font-medium"
                    >
                      {typeof value === "number" || typeof value === "string"
                        ? value
                        : 0}
                    </TableCell>
                  );
                })}
              </TableRow>

              {expandedRows.has(event.event_id) &&
                Object.values(event.subEvents).map((subEvent, index) => (
                  <TableRow
                    key={`${event.event_id}-${index}`}
                    className="bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <TableCell></TableCell>
                    <TableCell className="text-gray-400">└</TableCell>
                    <TableCell className="text-gray-700 pl-4">
                      {subEvent.name}
                    </TableCell>
                    {agentNames.map((agent) => (
                      <TableCell
                        key={`${event.event_id}-${agent}-${index}`}
                        className="text-center"
                      >
                        {subEvent[agent] || 0}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReviewTraineesPage;

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

const getAgentNames = (data: TableData[]) => {
  const agentNames = new Set<string>();
  data.forEach((event) => {
    // Check event level properties
    Object.keys(event).forEach((key) => {
      if (
        key !== "event_id" &&
        key !== "event_name" &&
        key !== "subEvents" &&
        typeof event[key] === "number"
      ) {
        agentNames.add(key);
      }
    });

    // Check subEvents
    Object.values(event.subEvents).forEach((subEvent) => {
      Object.keys(subEvent).forEach((key) => {
        if (key !== "name" && typeof subEvent[key] === "number") {
          agentNames.add(key);
        }
      });
    });
  });
  return Array.from(agentNames);
};

// Represents the data for a sub-event
export interface SubEventData {
  name: string;
  [agentName: string]: number | string; // e.g., "FurahaGrace": number
}

// Represents an event with possible sub-events and agent totals
export interface EventData {
  event_id: string;
  event_name: string;
  subEvents: {
    [subEventName: string]: SubEventData;
  };
  [agentName: string]:
    | number
    | string
    | { [subEventName: string]: SubEventData };
}

// Represents the full dataset: a mapping of event IDs to event data
export interface EventsData {
  [eventId: string]: EventData;
}

const mergeAgentData = (data: FixtureData[], home: boolean): TableData[] => {
  const merged = {} as EventsData;

  data?.forEach((fixture) => {
    const matchData = home ? fixture.home : fixture.away;
    const fixtureKey = fixture.fixture[0].matchday;

    Object.entries(matchData).forEach(([eventName, eventData]) => {
      const key = eventData.event_id;

      if (!merged[key]) {
        merged[key] = {
          event_id: eventData.event_id,
          event_name: eventName,
          subEvents: {},
        };
      }

      merged[key][fixtureKey] = parseInt(eventData.total, 10) || 0;

      if (Array.isArray(eventData["sub-event"])) {
        eventData["sub-event"].forEach((sub) => {
          const subKey = sub.subeventname;
          if (!merged[key].subEvents[subKey]) {
            merged[key].subEvents[subKey] = {
              name: sub.subeventname,
            };
          }
          merged[key].subEvents[subKey][fixtureKey] =
            parseInt(sub.totalsubevent) || 0;
        });
      }
    });
  });

  // Filter out events where all agent totals are 0
  const filteredEvents = Object.values(merged).filter((event) => {
    // Get all agent properties (excluding event_id, event_name, subEvents)
    const agentProperties = Object.keys(event).filter(
      (key) => key !== "event_id" && key !== "event_name" && key !== "subEvents"
    );

    // Check if at least one agent has a non-zero value
    return agentProperties.some((agent) => event[agent] !== 0);
  });

  // Also filter subEvents where all agent values are 0
  const processedEvents = filteredEvents.map((event) => {
    const filteredSubEvents = Object.fromEntries(
      Object.entries(event.subEvents).filter(([, subEvent]) => {
        const agentProperties = Object.keys(subEvent).filter(
          (key) => key !== "name"
        );
        return agentProperties.some((agent) => subEvent[agent] !== 0);
      })
    );

    return {
      ...event,
      subEvents: filteredSubEvents,
    };
  });

  return processedEvents.map((event) => ({
    ...event,
    subEvents: Object.values(event.subEvents),
  }));
};
