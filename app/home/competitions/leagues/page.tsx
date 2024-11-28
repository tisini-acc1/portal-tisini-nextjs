import tournamentService from "@/services/tournament.service";

const CompetitionsPage = async () => {
  const tournaments = await tournamentService.getTournaments();

  console.log("tourn", tournaments.data);

  return (
    <main className="space-y-4">
      <header className="border-b p-3 h-16">
        <div className="float-right">{/* <CreateTournamentDialog /> */}</div>
      </header>

      {/* <CompsTable data={competitions.data} columns={columns} /> */}
    </main>
  );
};

export default CompetitionsPage;
