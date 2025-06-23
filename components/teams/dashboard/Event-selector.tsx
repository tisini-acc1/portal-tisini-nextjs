import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SubEvent {
  name: string;
  [key: string]: string | number;
}

interface EventData {
  event_id: string;
  event_name: string;
  subEvents?: SubEvent[];
  [key: string]: string | number | SubEvent[] | undefined;
}

interface EventSelectorProps {
  events: EventData[];
  selectedEventIds: string[];
  onSelectionChange: (eventIds: string[]) => void;
}

export const EventSelector: React.FC<EventSelectorProps> = ({
  events,
  selectedEventIds,
  onSelectionChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEventToggle = (eventId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedEventIds, eventId]);
    } else {
      onSelectionChange(selectedEventIds.filter((id) => id !== eventId));
    }
  };

  const getSelectedEventsText = () => {
    if (selectedEventIds.length === 0) return "Select events...";
    if (selectedEventIds.length === 1) {
      const event = events.find((e) => e.event_id === selectedEventIds[0]);
      return event?.event_name || "Unknown event";
    }
    return `${selectedEventIds.length} events selected`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Events to Analyze</CardTitle>
      </CardHeader>
      <CardContent>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between min-h-[40px]"
            >
              <span className="flex items-center gap-2">
                {getSelectedEventsText()}
                {selectedEventIds.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {selectedEventIds.length}
                  </Badge>
                )}
              </span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-full min-w-[300px] bg-white"
            align="start"
          >
            {events.map((event) => (
              <DropdownMenuCheckboxItem
                key={event.event_id}
                checked={selectedEventIds.includes(event.event_id)}
                onCheckedChange={(checked) =>
                  handleEventToggle(event.event_id, checked)
                }
                className="flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  {event.event_name}
                  {event.subEvents && (
                    <Badge variant="secondary" className="text-xs">
                      {event.subEvents.length}
                    </Badge>
                  )}
                </span>
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <p className="text-sm text-muted-foreground mt-3">
          Select multiple events to see stacked comparison across fixtures
        </p>
      </CardContent>
    </Card>
  );
};
