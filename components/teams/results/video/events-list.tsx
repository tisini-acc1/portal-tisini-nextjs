import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { getEventStyle } from "@/lib/event-styles";

interface EventsListProps {
  events: VideoEvent[];
  players: Player[];
  // fixEvents: EventType[];
  onEventClick: (event: VideoEvent) => void;
}

const EventsList = ({
  events,
  players,
  // fixEvents,
  onEventClick,
}: EventsListProps) => {
  const [selectedEvent, setSelectedEvent] = useState("");

  // Get player name by ID
  const getPlayerName = (id: string) => {
    const player = players.find((p) => p.player_id === id);
    return player ? player.pname : "Unknown Player";
  };

  // Format timestamp for display (MM:SS)
  const formatTimestamp = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // console.log(selectedEvent);
  // console.log(fixEvents);

  return (
    <div className="py-2 px-3 space-y-2">
      {events.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No events match the current filters
        </div>
      ) : (
        events.map((event) => {
          const isSelected = event.id === selectedEvent;
          const eventStyle = getEventStyle(event.eventid);

          return (
            <Card
              key={event.id}
              className={`cursor-pointer hover:shadow-md transition-all ${
                isSelected
                  ? "border-2 border-blue-500 scale-[1.02] shadow-lg"
                  : `border ${eventStyle.colorClass}`
              }`}
              onClick={() => {
                setSelectedEvent(event.id);
                onEventClick(event);
              }}
            >
              <div className="p-3">
                <div
                  className={`flex items-center justify-between ${
                    isSelected ? "text-blue-800" : eventStyle.textClass
                  }`}
                >
                  <div className="flex items-center">
                    <span
                      className={`mr-2 ${isSelected ? "text-xl" : "text-lg"}`}
                    >
                      {eventStyle.emoji}
                    </span>
                    <div className="flex flex-col">
                      <span
                        className={`font-medium capitalize text-xs ${
                          isSelected ? "font-bold" : ""
                        }`}
                      >
                        {event.event_name}
                      </span>
                      {event.subevent_id && (
                        <span
                          className={`block text-xs ${
                            isSelected ? "text-blue-600" : "text-gray-600"
                          }`}
                        >
                          {event.subevent_id}
                        </span>
                      )}
                    </div>
                  </div>
                  <span
                    className={`text-sm font-mono px-2 py-1 rounded ${
                      isSelected ? "bg-blue-100" : "bg-black bg-opacity-10"
                    }`}
                  >
                    {formatTimestamp(parseInt(event.PlayTimeinvideo))}
                  </span>
                </div>

                <p
                  className={`text-sm mt-1 ${
                    isSelected ? "font-medium text-blue-700" : "text-gray-700"
                  }`}
                >
                  {getPlayerName(event.player_id)}
                </p>
              </div>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default EventsList;
