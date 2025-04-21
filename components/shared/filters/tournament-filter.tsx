"use client";

import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/store/store";
import FilterLoader from "./filter-loader";
import { getTournaments } from "@/actions/django-actions";
import FilterTournamentSeries from "./filter-tournament-series";

const TournamentFilter = () => {
  const { store } = useStore((state) => state);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["overview", store.user.id],
    queryFn: () => getTournaments(),
  });

  if (isLoading) {
    return <FilterLoader />;
  }

  if (isError) {
    console.log("tourFilter: ", error);
    return <div>Error</div>;
  }

  return (
    <div className="flex">
      <FilterTournamentSeries tournaments={data as Tournament[]} />
    </div>
  );
};

export default TournamentFilter;
