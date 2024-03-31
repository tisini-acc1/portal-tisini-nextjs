import { getAllComps } from "@/lib/fetch-data/competitions";
import CompetionTeams from "../components/competitions/competion-teams";

const TeamsCompsPage = async () => {
  const compsData: Promise<Competition[]> = getAllComps();
  const competitions = await compsData;

  return <CompetionTeams competitions={competitions.data} />;
};

export default TeamsCompsPage;
