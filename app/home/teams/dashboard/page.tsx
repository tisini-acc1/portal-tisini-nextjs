"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Loading from "../../loading";
import { useStore } from "@/store/store";
import { getTeamTournaments } from "@/actions/php-actions";
import ResultsHeader from "@/components/teams/results/results-header";
import Dashboard from "./dashboard";

const DashboardPage = () => {
  const [series, setSeries] = useState<TeamSeason[]>([]);
  const [fixtures, setFixtures] = useState<TeamFixture[]>([]);

  const { store, updateTournament, updateSerie, updateFixture } = useStore(
    (state) => state
  );

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["teamTournaments", store.team.id],
    queryFn: () => getTeamTournaments(store.team.id, ""),
  });

  useEffect(() => {
    if (data && data[0] && data[0].season && data[0].season.length > 0) {
      setSeries(data[0].season);
      updateSerie(data[0].season[0]?.id);
      updateTournament(data[0].tournamentid);
    }
  }, [data, updateSerie, updateTournament]);

  useEffect(() => {
    if (data && store.tournament && store.serie) {
      const tournament = data.find(
        (tournament) => tournament.tournamentid === store.tournament
      );

      if (tournament && tournament.season && tournament.season.length > 0) {
        const season = tournament.season.find(
          (season) => season.id === store.serie
        );

        if (season && season.fixture && season.fixture.length > 0) {
          const reversedFixtures = [...season.fixture].reverse();
          setFixtures(reversedFixtures);
        }

        setSeries(tournament.season);
        updateSerie(tournament.season[0].id);
      }
    }
  }, [data, store.tournament, store.serie]);

  // console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.log(error.message);
    return <div>Error!</div>;
  }

  return (
    <main>
      {data && data.length <= 0 ? (
        <div className="flex items-center justify-center bg-gray-50 h-screen text-2xl font-mono p-4">
          <p className="w-1/2 mx-auto">
            Ooops! No fixture results available at this time.
          </p>
        </div>
      ) : (
        <section>
          {data && data?.length > 1 && (
            <ResultsHeader
              tournamentsData={data as TeamTournament[]}
              seriesData={series}
            />
          )}

          <Dashboard fixtures={fixtures} />
        </section>
      )}
    </main>
  );
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

const mergeAgentData = (data: FixtureData[], teamId: string): TableData[] => {
  const merged = {} as EventsData;
  console.log(data);
  data?.forEach((fixture) => {
    const matchData =
      teamId === fixture.fixture[0].team1_id ? fixture.home : fixture.away;
    const fixtureKey = fixture?.fixture?.[0]?.matchday;
    console.log(fixture);
    console.log(matchData);
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
            parseInt(sub.totalsubevent, 10) || 0;
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

export default DashboardPage;
