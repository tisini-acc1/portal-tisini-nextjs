import React from "react";

const Seasons = ({ series }: { series: Serie[] }) => {
  return (
    <div className="space-y-2">
      {series.map((serie, index) => (
        <div
          key={serie.id}
          className={`${
            index % 2 === 0 ? "bg-white" : "bg-gray-50"
          } hover:bg-gray-200 flex justify-between items-center`}
        >
          <div>{serie.name}</div>
          <div>{serie.date_from}</div>
          <div>{serie.date_to}</div>
          <div>{serie.number_of_teams}</div>
        </div>
      ))}
    </div>
  );
};

export default Seasons;
