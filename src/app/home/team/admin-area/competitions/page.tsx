import React from "react";
import Competitions from "../components/competitions";
import { getAllComps } from "@/lib/fetch-data/competitions";

const CompetitionsPage = async () => {
  const compsData: Promise<Competition[]> = getAllComps();
  const competitions = await compsData;

  // console.log(competitions);

  return (
    <main>
      <h1 className="text-xl">Available Competitions to register</h1>

      {/* fetch competitions and display them */}
      <section className="mt-4">
        <Competitions comps={competitions.data} />
      </section>
    </main>
  );
};

export default CompetitionsPage;
