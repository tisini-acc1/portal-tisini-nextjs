import Header from "@/app/home/team/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMyTeams, getTeam } from "@/lib/fetch-data/teams";
import CreatePlayerForm from "../../components/create-player-form";

type ParamsProps = {
  params: {
    teamId: string;
  };
};

const AddPlayerPage = async ({ params: { teamId } }: ParamsProps) => {
  const teamData: Promise<Team> = getTeam(teamId);
  const team = await teamData;

  return (
    <main className="space-y-3 m-auto">
      {/* <Header /> */}

      <Card className="md:w-[750px] w-auto">
        <CardHeader>
          <CardTitle>Add new player to {team.team_name}</CardTitle>
          <CardDescription>
            The default password for the player is &lsquo;player&lsquo;
          </CardDescription>
        </CardHeader>

        <CardContent>
          <CreatePlayerForm teamId={teamId} />
        </CardContent>
      </Card>
    </main>
  );
};

export default AddPlayerPage;
