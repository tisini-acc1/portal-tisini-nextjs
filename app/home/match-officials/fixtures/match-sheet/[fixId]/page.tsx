// "use client";

import { getFixRefEvents } from "@/actions/php-actions";
import LineupsSection from "@/components/shared/match-sheet/lineups";
import MatchDataSection from "@/components/shared/match-sheet/match-data";
import MatchSheetHeader from "@/components/shared/match-sheet/match-sheet-header";
import OfficialsCommentsSection from "@/components/shared/match-sheet/officials-comments-section";
// import { useStore } from "@/lib/store";

type SheetProps = {
  params: Promise<{ fixId: string }>;
};

const MatchSheetPage = async ({ params }: SheetProps) => {
  const { fixId } = await params;

  const id = fixId.split("-")[0];
  const homeId = fixId.split("-")[1];

  const data = await getFixRefEvents(id);
  // const refFix = useStore((state) => state.store.refFix);

  // console.log(fixId);
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
        homeId={homeId}
        fixEvents={data?.events}
      />
    </main>
  );
};

export default MatchSheetPage;
