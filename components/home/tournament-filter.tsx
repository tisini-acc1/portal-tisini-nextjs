"use client";

import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/lib/store";
import FilterLoader from "./filter-loader";
import { getTournaments } from "@/actions/django-actions";
import FilterTournamentSeries from "../filters/filter-tournament-series";

const TournamentFilter = () => {
  const { store } = useStore((state) => state);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["overview", store.user.id],
    queryFn: () => getTournaments(),
  });

  if (isLoading) {
    return <FilterLoader />;
  }

  if (isError) {
    return <div>Error</div>;
  }
  // console.log(data);
  return (
    <div className="flex">
      <FilterTournamentSeries tournaments={data as Tournament[]} />
    </div>
  );
};

export default TournamentFilter;
