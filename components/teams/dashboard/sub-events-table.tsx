import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartBar } from "lucide-react";

interface SubEvent {
  name: string;
  [key: string]: string | number;
}

interface ExtendedSubEvent {
  name: string;
  isMainEvent?: boolean;
  [key: string]: string | number | boolean | undefined;
}

interface EventData {
  event_id: string;
  event_name: string;
  subEvents?: SubEvent[];
  [key: string]: string | number | SubEvent[] | undefined;
}

interface SubEventsTableProps {
  data: EventData[];
  selectedEventIds: string[];
  onToggleView: () => void;
}

// Background colors for different events
const eventColors = [
  "bg-blue-100",
  "bg-blue-50",
  "bg-blue-100",
  "bg-blue-50",
  "bg-blue-100",
  "bg-blue-50",
  "bg-blue-100",
  "bg-blue-50",
];

export const SubEventsTable: React.FC<SubEventsTableProps> = ({
  data,
  selectedEventIds,
  onToggleView,
}) => {
  // Get all fixture IDs (team/player keys)
  const getFixtureKeys = () => {
    const keys = new Set<string>();
    data.forEach((event) => {
      Object.keys(event).forEach((key) => {
        if (!["event_id", "event_name", "subEvents", ""].includes(key)) {
          keys.add(key);
        }
      });
    });
    return Array.from(keys);
  };

  const fixtureKeys = getFixtureKeys();
  const selectedEvents = data.filter((event) =>
    selectedEventIds.includes(event.event_id)
  );

  // Collect all events (with and without sub-events)
  const groupedSubEvents = React.useMemo(() => {
    const groups: Array<{
      eventName: string;
      eventId: string;
      subEvents: ExtendedSubEvent[];
    }> = [];

    selectedEvents.forEach((event) => {
      if (event.subEvents && event.subEvents.length > 0) {
        // Events with sub-events
        groups.push({
          eventName: event.event_name,
          eventId: event.event_id,
          subEvents: event.subEvents,
        });
      } else {
        // Events without sub-events - show as main event row
        const mainEventRow: ExtendedSubEvent = {
          name: event.event_name,
          isMainEvent: true,
        };

        // Add fixture values to the main event row, filtering out non-fixture properties
        fixtureKeys.forEach((fixture) => {
          const value = event[fixture];
          if (typeof value === "string" || typeof value === "number") {
            mainEventRow[fixture] = value;
          } else {
            mainEventRow[fixture] = 0;
          }
        });

        groups.push({
          eventName: event.event_name,
          eventId: event.event_id,
          subEvents: [mainEventRow],
        });
      }
    });

    return groups;
  }, [selectedEvents, fixtureKeys]);

  // Calculate totals for each sub-event
  const calculateTotal = (subEvent: ExtendedSubEvent) => {
    return fixtureKeys.reduce((sum, fixture) => {
      const value = subEvent[fixture];
      return sum + (typeof value === "number" ? value : 0);
    }, 0);
  };

  // ... keep existing code (background colors for different events)

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">
            Sub-Events by Fixture
          </CardTitle>
          <Button
            onClick={onToggleView}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChartBar size={16} />
            View Bar Chart
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Event</TableHead>
                <TableHead className="font-semibold">Sub-Event</TableHead>
                {fixtureKeys.map((fixture) => (
                  <TableHead
                    key={fixture}
                    className="font-semibold text-center"
                  >
                    Fixture {fixture}
                  </TableHead>
                ))}
                <TableHead className="font-semibold text-center">
                  Total
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groupedSubEvents.map((group, groupIndex) => (
                <React.Fragment key={group.eventId}>
                  {group.subEvents.map((subEvent, subIndex) => (
                    <TableRow
                      key={`${group.eventId}-${subIndex}`}
                      className={eventColors[groupIndex % eventColors.length]}
                    >
                      <TableCell className="font-medium">
                        {subIndex === 0 ? group.eventName : ""}
                      </TableCell>
                      <TableCell>
                        {subEvent.isMainEvent ? "" : subEvent.name}
                      </TableCell>
                      {fixtureKeys.map((fixture) => (
                        <TableCell key={fixture} className="text-center">
                          {subEvent[fixture] || 0}
                        </TableCell>
                      ))}
                      <TableCell className="text-center font-medium">
                        {calculateTotal(subEvent)}
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
              {groupedSubEvents.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={fixtureKeys.length + 3}
                    className="text-center text-muted-foreground"
                  >
                    No events selected
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
