import { getMyTeams } from "@/lib/fetch-data/teams";
import Header from "../../components/header";
import AddTeamModal from "../components/add-team-modal";
import MyTeams from "../components/my-teams";

const MyTeamsPage = async () => {
  const teamsData: Promise<Team[]> = getMyTeams();
  const teams = await teamsData;

  const teamId = teams[0].id;

  return (
    <main>
      <Header modal={<AddTeamModal teamId={teamId} />} />

      {/* display subsets below */}
      <section className="m-2 mt-4">
        <h2 className="font-semibold">
          Subset teams under {teams[0].team_name}
        </h2>

        <MyTeams />
      </section>
    </main>
  );
};

export default MyTeamsPage;
