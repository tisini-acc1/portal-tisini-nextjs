import { Suspense } from "react";

import Loading from "@/app/(home)/loading";
import { getAllPlayers } from "@/data/teams/team-player";
import { getCountryCodes } from "@/data/general/country-codes";
import { getTeamTournaments } from "@/data/teams/team-tournaments";
import AllPlayers from "../../../components/teams/players/all-players";

type PlayerProps = {
  params: Promise<{ teamId: string }>;
};

const AllPlayersPage = async ({ params }: PlayerProps) => {
  const { teamId } = await params;
  const id = teamId.split("-").pop() || "";

  const countryData = await getCountryCodes();
  const playerData = await getAllPlayers(id);
  const tournData = await getTeamTournaments(id, "");

  return (
    <Suspense fallback={<Loading />}>
      <AllPlayers
        countries={countryData}
        players={playerData}
        tournaments={tournData}
      />
    </Suspense>
  );
};

export default AllPlayersPage;
