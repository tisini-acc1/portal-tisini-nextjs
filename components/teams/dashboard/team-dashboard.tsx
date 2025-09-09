import React, { useState } from "react";
import { FixtureChart } from "./fixture-chart";
import { EventSelector } from "./Event-selector";
import { SubEventsTable } from "./sub-events-table";

const TeamDashboard = ({ teamData }: { teamData: TableData[] }) => {
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>(["134"]);
  const [showSubEvents, setShowSubEvents] = useState(false);

  const handleEventSelection = (eventIds: string[]) => {
    setSelectedEventIds(eventIds);
  };

  const handleToggleView = () => {
    setShowSubEvents(!showSubEvents);
  };

  // console.log(teamData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Sports Analytics Dashboard</h1>
        </div>

        <EventSelector
          events={teamData}
          selectedEventIds={selectedEventIds}
          onSelectionChange={handleEventSelection}
        />

        {!showSubEvents ? (
          <FixtureChart
            data={teamData}
            selectedEventIds={selectedEventIds}
            onToggleView={handleToggleView}
          />
        ) : (
          <SubEventsTable
            data={teamData}
            selectedEventIds={selectedEventIds}
            onToggleView={handleToggleView}
          />
        )}
      </div>
    </div>
  );
};

export default TeamDashboard;
