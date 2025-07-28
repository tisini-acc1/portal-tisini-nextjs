"use client";

import { Filter } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import VideoPlayer from "./video-player";
import EventsList from "./events-list";
import { useStore } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type VideoProps = {
  videoData: VideoEvent[];
  fixEvents: EventType[];
};

const VideoAnalysis = ({ videoData = [], fixEvents = [] }: VideoProps) => {
  const [selectedEvent, setSelectedEvent] = useState("all-events");
  const [selectedPlayer, setSelectedPlayer] = useState("all-players");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoUrl, setVideoUrl] = useState(
    videoData[0]?.videourl?.split("&t=")[0] || ""
  );

  const team = useStore((state) => state.store.team);

  const resetFilters = () => {
    setSelectedEvent("all-events");
    setSelectedPlayer("all-players");
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleEventClick = (event: VideoEvent) => {
    let timestamp = 0;

    // Priority 1: Use PlayTimeinvideo if available
    if (event.PlayTimeinvideo) {
      timestamp = parseFloat(event.PlayTimeinvideo);
    }
    // Priority 2: Extract from URL if no PlayTimeinvideo
    else if (event.videourl) {
      const timeMatch = event.videourl.match(/[?&]t=(\d+(\.\d+)?)/);
      if (timeMatch) timestamp = parseFloat(timeMatch[1]);
    }

    // Update video URL if different (without timestamp)
    const baseUrl = event.videourl ? event.videourl.split("&t=")[0] : videoUrl;
    if (baseUrl !== videoUrl) {
      setVideoUrl(baseUrl);
    }

    setCurrentTime(timestamp);
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp;
    }
  };

  const { filteredEvents, uniquePlayers, uniqueEvents } = useMemo(() => {
    const eventsMap = new Map();
    const playersMap = new Map();

    const teamData = videoData.filter((event) => event.team === team.id);

    // First filter events based on current selections
    const filtered = teamData.filter((event) => {
      const eventMatch =
        selectedEvent === "all-events" || event.eventid === selectedEvent;
      const playerMatch =
        selectedPlayer === "all-players" || event.player_id === selectedPlayer;
      return eventMatch && playerMatch;
    });

    teamData.forEach((data) => {
      if (selectedEvent === "all-events" || data.eventid === selectedEvent) {
        if (!playersMap.has(data.player_id)) {
          playersMap.set(data.player_id, {
            player_id: data.player_id,
            pname: data.pname,
            Jersey_No: data.Jersey_No,
          });
        }
      }

      if (!eventsMap.has(data.eventid)) {
        eventsMap.set(data.eventid, {
          id: data.eventid,
          ename: data.event_name,
          subId: data.subevent_id,
          subEvent: data.subevent_id,
        });
      }
    });

    return {
      filteredEvents: filtered,
      uniquePlayers: Array.from(playersMap.values()),
      uniqueEvents: Array.from(eventsMap.values()),
    };
  }, [videoData, selectedEvent, selectedPlayer]);

  // When event selection changes, reset player selection if it's no longer valid
  useEffect(() => {
    if (selectedPlayer === "all-players") return;

    const playerStillAvailable = uniquePlayers.some(
      (player) => player.player_id === selectedPlayer
    );

    if (!playerStillAvailable) {
      setSelectedPlayer("all-players");
    }
  }, [uniquePlayers, selectedPlayer]);

  if (!videoData.length) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-500">No video data available</p>
      </div>
    );
  }

  console.log(fixEvents);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Video Player Section */}
      <div className="w-full md:w-3/4 h-1/2 md:h-full p-4 md:p-6 bg-gray-50">
        {videoUrl ? (
          <VideoPlayer
            url={videoUrl}
            currentTime={currentTime - 2}
            // onTimeUpdate={setCurrentTime}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No video URL available
          </div>
        )}
      </div>

      {/* Events Sidebar */}
      <div className="w-full md:w-1/4 h-1/2 md:h-full overflow-hidden flex flex-col bg-white shadow-lg">
        {/* Filters Header */}
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Video Analysis</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              aria-label="Reset filters"
            >
              <Filter className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          {/* Event Type Filter */}
          <div className="mb-3">
            <label
              htmlFor="event-filter"
              className="text-sm text-gray-500 mb-1 block"
            >
              Event Type
            </label>
            <Select
              value={selectedEvent}
              onValueChange={setSelectedEvent}
              aria-label="Filter by event type"
            >
              <SelectTrigger id="event-filter">
                <SelectValue placeholder="All Events" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-events">All Events</SelectItem>
                {uniqueEvents.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.ename}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Player Filter */}
          <div>
            <label
              htmlFor="player-filter"
              className="text-sm text-gray-500 mb-1 block"
            >
              Player
            </label>
            <Select
              value={selectedPlayer}
              onValueChange={setSelectedPlayer}
              aria-label="Filter by player"
            >
              <SelectTrigger id="player-filter">
                <SelectValue placeholder="All Players" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-players">All Players</SelectItem>
                {uniquePlayers.map((player) => (
                  <SelectItem key={player.player_id} value={player.player_id}>
                    {player.Jersey_No
                      ? `${player.Jersey_No}. ${player.pname}`
                      : player.pname}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* Events List */}
        <div className="flex-1 overflow-y-auto">
          {filteredEvents.length > 0 ? (
            <EventsList
              events={filteredEvents}
              onEventClick={handleEventClick}
              players={uniquePlayers}
              //   fixEvents={fixEvents}
            />
          ) : (
            <div className="p-4 text-center text-gray-500">
              No events match your filters
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoAnalysis;
