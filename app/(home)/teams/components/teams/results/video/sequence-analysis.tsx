"use client";

import { useMemo, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { passSequenceAnalysis } from "@/lib/pass-sequence";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTeamStore } from "@/store/team.store";

type SequenceProps = {
  videoData: VideoEvent[];
};

const EVENT_KEYWORDS = [
  "shot",
  "cross",
  "ball",
  "aerial",
  "chance",
  "foul",
  "tackle",
  "pass",
  "box",
];

const SequenceAnalysis = ({ videoData }: SequenceProps) => {
  const [selectedKeyword, setSelectedKeyword] = useState<string>("all");
  const [selectedPlayer, setSelectedPlayer] = useState<string>("all");

  const teamId = useTeamStore((state) => state.store.userTeam.team_id);
  const teamEvents = videoData.filter((item) => item.team === teamId);

  const sequences = passSequenceAnalysis(teamEvents);

  // Pass sequence metrics
  const totalSequences = sequences.length;
  const totalPassCount = sequences.reduce(
    (sum, item) => sum + item.Pass_Count,
    0
  );
  const averagePassSequence = totalPassCount / totalSequences;

  // Pass length distribution
  const sequencesOver10 = sequences.filter(
    (item) => item.Pass_Count >= 10
  ).length;
  const sequences7to9 = sequences.filter(
    (item) => item.Pass_Count >= 7 && item.Pass_Count <= 9
  ).length;
  const sequences4to6 = sequences.filter(
    (item) => item.Pass_Count >= 4 && item.Pass_Count <= 6
  ).length;
  const sequencesBelow3 = sequences.filter(
    (item) => item.Pass_Count < 4
  ).length;

  // Shot analysis
  const shots = sequences.filter((seq) =>
    seq.Next_Event.toLowerCase().includes("shot")
  );
  const shotsOnTarget = shots.filter(
    (seq) => seq.Outcome === "Positive"
  ).length;
  const shotAccuracy =
    shots.length > 0 ? (shotsOnTarget / shots.length) * 100 : 0;

  // Cross analysis
  const crosses = sequences.filter((seq) =>
    seq.Next_Event.toLowerCase().includes("cross")
  );
  const crossComplete = crosses.filter(
    (seq) => seq.Outcome === "Positive"
  ).length;
  const crossAccuracy =
    crosses.length > 0 ? (crossComplete / crosses.length) * 100 : 0;
  // Get players based on current filter
  const filteredPlayers = useMemo(() => {
    const players = new Set<string>();

    sequences.forEach((seq) => {
      const matchesKeyword =
        selectedKeyword === "all" ||
        seq.Next_Event.toLowerCase().includes(selectedKeyword.toLowerCase());

      if (matchesKeyword && seq.Player) {
        players.add(seq.Player);
      }
    });

    return Array.from(players).sort();
  }, [sequences, selectedKeyword]);

  // Filter sequences based on selections
  const filteredSequences = useMemo(() => {
    return sequences.filter((seq) => {
      const keywordMatch =
        selectedKeyword === "all" ||
        seq.Next_Event.toLowerCase().includes(selectedKeyword.toLowerCase());

      const playerMatch =
        selectedPlayer === "all" || seq.Player === selectedPlayer;

      return keywordMatch && playerMatch;
    });
  }, [sequences, selectedKeyword, selectedPlayer]);

  // Reset player filter when keyword changes
  const handleKeywordChange = (value: string) => {
    setSelectedKeyword(value);
    setSelectedPlayer("all"); // Reset player filter when event type changes
  };

  // Calculate metrics
  const { totalSelected, positiveSelected, positivePercentage } =
    useMemo(() => {
      const total = filteredSequences.length;
      const positive = filteredSequences.filter(
        (seq) => seq.Outcome === "Positive"
      ).length;
      const percentage =
        total > 0 ? ((positive / total) * 100).toFixed(1) : "0";

      return {
        totalSelected: total,
        positiveSelected: positive,
        positivePercentage: percentage,
      };
    }, [filteredSequences]);

  return (
    <section className="space-y-4 pt-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Sequences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalSequences}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalPassCount} total passes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Pass Sequence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {averagePassSequence.toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              passes per sequence
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Sequence Length
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-4 gap-2">
            <div className="text-center">
              <div className="text-xl font-bold">{sequencesOver10}</div>
              <p className="text-xs text-muted-foreground">10+</p>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{sequences7to9}</div>
              <p className="text-xs text-muted-foreground">7-9</p>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{sequences4to6}</div>
              <p className="text-xs text-muted-foreground">4-6</p>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{sequencesBelow3}</div>
              <p className="text-xs text-muted-foreground">1-3</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shot and Cross Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Sequence ending in shot
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Shots</p>
                <p className="text-2xl font-bold">{shots.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">On Target</p>
                <p className="text-2xl font-bold">{shotsOnTarget}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Accuracy: {shotAccuracy.toFixed(1)}%
              </p>
              <Progress value={shotAccuracy} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Sequence ending in Cross
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Crosses</p>
                <p className="text-2xl font-bold">{crosses.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{crossComplete}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Accuracy: {crossAccuracy.toFixed(1)}%
              </p>
              <Progress value={crossAccuracy} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        {/* Filters Section */}
        <div className="p-4 border-b flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Filter by Event Type
            </label>
            <Select onValueChange={handleKeywordChange} value={selectedKeyword}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                {EVENT_KEYWORDS.map((keyword) => (
                  <SelectItem key={keyword} value={keyword}>
                    {keyword.charAt(0).toUpperCase() + keyword.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Filter by Player
            </label>
            <Select
              onValueChange={setSelectedPlayer}
              value={selectedPlayer}
              disabled={filteredPlayers.length === 0}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    filteredPlayers.length === 0
                      ? "No players found"
                      : "Select player"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Players</SelectItem>
                {filteredPlayers.map((player) => (
                  <SelectItem key={player} value={player}>
                    {player}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Metrics for Selected Filters */}
        {selectedKeyword !== "all" && (
          <div className="p-4 bg-gray-50 border-b">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">Total Sequences</p>
                <p className="text-xl font-semibold">{totalSelected}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Positive Outcomes</p>
                <p className="text-xl font-semibold">{positiveSelected}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Success Rate</p>
                <p className="text-xl font-semibold">{positivePercentage}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Passes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ended With
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Player
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Outcome
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSequences.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {item.Pass_Count}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.Next_Event}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.Player || "Unknown"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.Quarter} {item.Minute}:{item.Second}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        item.Outcome === "Positive"
                          ? "bg-green-100 text-green-800"
                          : item.Outcome === "Negative"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                  >
                    {item.Outcome}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

{
  /* <div className="w-full">
  <Card className="shadow-lg border-0">
    <CardContent className="p-6 space-y-4">
      <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 font-medium">Total Sequences</p>
            <p className="text-3xl font-bold">{totalSequences}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 font-medium">
              Average Pass Sequence
            </p>
            <p className="text-3xl font-bold">
              {averagePassSequence.toFixed(1)}
            </p>
          </div>
        </div>
      </div>

      <div className="col-span-1 md:col-span-4 lg:col-span-3 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 font-medium">
              Over 10+ Pass Sequence
            </p>
            <p className="text-3xl font-bold">{sequencesOver10}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 font-medium">
              Between 7 - 9 Pass Sequence
            </p>
            <p className="text-3xl font-bold">{sequencesOver6}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 font-medium">
              Between 4 - 6 Pass Sequence
            </p>
            <p className="text-3xl font-bold">{sequencesOver4}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 font-medium">
              Below 3 Pass Sequence
            </p>
            <p className="text-3xl font-bold">{sequencesBelow3}</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</div>; */
}
export default SequenceAnalysis;
