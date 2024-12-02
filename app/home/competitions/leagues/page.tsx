import tournamentService from "@/services/tournament.service";
import Image from "next/image";

export const dynamic = "force-dynamic";

const CompetitionsPage = async () => {
  const tournaments = await tournamentService.getTournaments();

  console.log("tourn", tournaments);

  return (
    <main className="space-y-4">
      <header className="border-b p-3 h-16">
        <div className="float-right">{/* <CreateTournamentDialog /> */}</div>
      </header>

      <section className="space-y-4">
        {tournaments.map((item) => (
          <div
            key={item.tournament_id}
            className="border rounded-md flex items-center"
          >
            <div>
              <Image
                src={"/tournament-img.jpg"}
                alt=""
                width={50}
                height={50}
              />
            </div>
            <div className="p-4">{item.tournament}</div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default CompetitionsPage;
