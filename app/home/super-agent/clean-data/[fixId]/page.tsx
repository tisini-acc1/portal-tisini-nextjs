// import React, { Suspense } from "react";
// import Loading from "../../../loading";
// import { FixturesTable } from "../../fixtures-table";
// import { getSuperAgentFixtures, getVideoEvents } from "@/actions/php-actions";
// import { columns } from "../../columns";
import { getToken } from "@/actions/session";

type CleanProps = {
  params: Promise<{ fixId: string }>;
};

const fetchFixtureEvents = async (id: string) => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  if (!baseURL) throw new Error("API host is not defined!");

  const response = await fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "fixtureevents",
      fixtureid: id,
      gettoken: token,
    }),
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    const errorText = await response.text(); // Helpful for debugging
    throw new Error(`Failed to fetch fixture events: ${errorText}`);
  }

  return response.json();
};

const CleanDataPage = async ({ params }: CleanProps) => {
  const { fixId } = await params;

  const data = (await fetchFixtureEvents(fixId)) as VideoEvent[];

  const fixtures = data;

  console.log(fixtures);

  return (
    <main>
      Clean Data
      {/* <Suspense fallback={<Loading />}>
        <FixturesTable data={fixtures} columns={columns} />
      </Suspense> */}
    </main>
  );
};

export default CleanDataPage;
