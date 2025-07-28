import { getFixRefEvents } from "@/actions/php-actions";
import LineupsSection from "@/components/shared/match-sheet/lineups";
import MatchDataSection from "@/components/shared/match-sheet/match-data";
import MatchSheetHeader from "@/components/shared/match-sheet/match-sheet-header";
import OfficialsCommentsSection from "@/components/shared/match-sheet/officials-comments-section";
import React from "react";

type SheetProps = {
  params: Promise<{ fixId: string }>;
};

const MatchSheetPage = async ({ params }: SheetProps) => {
  const { fixId } = await params;

  const ids = fixId.split("-");

  const data = await getFixRefEvents(ids?.[0]);

  // console.log(data);

  return (
    <main className="space-y-4">
      <MatchSheetHeader details={data?.fixturedata[0]} fixData={data?.events} />

      <OfficialsCommentsSection
        refData={data?.referee}
        details={data?.fixturedata[0]}
      />

      <LineupsSection home={data?.hometeamlineup} away={data?.awayteamlineup} />

      <MatchDataSection
        home={data?.hometeamlineup}
        away={data?.awayteamlineup}
        homeId={ids?.[1]}
        fixEvents={data?.events}
      />
    </main>
  );
};

export default MatchSheetPage;
