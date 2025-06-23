"use client";

type Props = {
  homeEvent: EventData;
  awayEvent: EventData;
};

import { useState } from "react";

const EventCard = ({ homeEvent, awayEvent }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const eventName = homeEvent?.name || awayEvent?.name;

  // Get all unique sub-event names that actually have values
  const homeSubEvents =
    homeEvent?.["sub-event"]
      ?.filter((s) => s.subTotal !== 0)
      .map((s) => s.subeventName) || [];
  const awaySubEvents =
    awayEvent?.["sub-event"]
      ?.filter((s) => s.subTotal !== 0)
      .map((s) => s.subeventName) || [];
  const subEvents = Array.from(new Set([...homeSubEvents, ...awaySubEvents]));

  const hasSubEvents = subEvents.length > 0;

  return (
    <div className="mb-6">
      {/* Main Event Row - now clickable if there are sub-events */}
      <div
        className={`flex items-center justify-between border rounded-lg overflow-hidden bg-gray-50 ${
          hasSubEvents ? "cursor-pointer hover:bg-gray-100" : ""
        }`}
        onClick={() => hasSubEvents && setIsExpanded(!isExpanded)}
      >
        {/* Home Team Total */}
        <div className="flex-1 p-3 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {homeEvent?.total || "0"}
          </div>
        </div>

        {/* Event Name with chevron indicator if has sub-events */}
        <div className="flex-1 p-3 text-center border-x flex items-center justify-center gap-2">
          <h3 className="font-semibold text-lg">{eventName}</h3>
          {hasSubEvents && (
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </div>

        {/* Away Team Total */}
        <div className="flex-1 p-3 text-center">
          <div className="text-2xl font-bold text-red-600">
            {awayEvent?.total || "0"}
          </div>
        </div>
      </div>

      {/* Sub-events - now collapsible */}
      {hasSubEvents && isExpanded && (
        <div className="mt-2 space-y-1 animate-fadeIn">
          {subEvents.map((subEventName) => {
            const homeSubValue = homeEvent?.["sub-event"]?.find(
              (s) => s.subeventName === subEventName
            )?.subTotal;
            const awaySubValue = awayEvent?.["sub-event"]?.find(
              (s) => s.subeventName === subEventName
            )?.subTotal;

            return (
              <div
                key={subEventName}
                className="flex items-center justify-between border rounded overflow-hidden bg-gray-50"
              >
                {/* Home Sub-event Value */}
                <div className="flex-1 p-2 text-center">
                  <span className="text-sm font-medium text-blue-600">
                    {homeSubValue || "-"}
                  </span>
                </div>

                {/* Sub-event Name */}
                <div className="flex-1 p-2 text-center border-x">
                  <span className="text-sm text-gray-600">{subEventName}</span>
                </div>

                {/* Away Sub-event Value */}
                <div className="flex-1 p-2 text-center">
                  <span className="text-sm font-medium text-red-600">
                    {awaySubValue || "-"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventCard;
