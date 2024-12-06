"use client";

import { useQuery } from "@tanstack/react-query";

import { getTournaments } from "@/actions/django-actions";
import FilterTournamentSeries from "../filters/filter-tournament-series";

const TournamentFilter = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tournaments"],
    queryFn: () => getTournaments(),
  });

  if (isLoading) {
    return;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="flex">
      <FilterTournamentSeries tournaments={data as Tournament[]} />
    </div>
  );
};

export default TournamentFilter;
