import tournamentService from "@/services/tournament.service";

const CompetitionsPage = async () => {
  const tournaments = await tournamentService.getTournaments();

  console.log("tourn", tournaments.data);

  return <div>CompetitionsPage</div>;
};

export default CompetitionsPage;
