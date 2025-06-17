import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table2 } from "lucide-react";

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

interface FixtureChartProps {
  data: EventData[];
  selectedEventIds: string[];
  onToggleView: () => void;
}

export const FixtureChart: React.FC<FixtureChartProps> = ({
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
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#00ff00",
    "#ff00ff",
  ];

  // Prepare chart data - each fixture is a data point
  const chartData = React.useMemo(() => {
    return fixtureKeys.map((fixture) => {
      const fixtureData: any = { fixture };

      selectedEventIds.forEach((eventId) => {
        const event = data.find((e) => e.event_id === eventId);
        if (event) {
          fixtureData[event.event_name] = Number(event[fixture]) || 0;
        }
      });

      return fixtureData;
    });
  }, [data, selectedEventIds, fixtureKeys]);

  const selectedEvents = data.filter((event) =>
    selectedEventIds.includes(event.event_id)
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">
            Event Totals by Fixture {selectedEventIds.length > 1 && "(Stacked)"}
          </CardTitle>
          <Button
            onClick={onToggleView}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Table2 size={16} />
            View Sub-Events Table
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="fixture"
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend />
              {selectedEvents.map((event, index) => (
                <Bar
                  key={event.event_id}
                  dataKey={event.event_name}
                  fill={colors[index % colors.length]}
                  radius={[2, 2, 0, 0]}
                  stackId={selectedEventIds.length > 1 ? "stack" : undefined}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
