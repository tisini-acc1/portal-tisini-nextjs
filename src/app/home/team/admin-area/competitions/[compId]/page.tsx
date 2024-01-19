import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyTeams } from "@/lib/fetch-data/teams";
import SelectTeamForm from "../../components/select-team-form";
import { getComp } from "@/lib/fetch-data/competitions";

type Props = {
  params: {
    compId: string;
  };
};

const SingleCompPage = async ({ params: { compId } }: Props) => {
  const compData: Promise<Competition> = getComp(compId);
  const comp = await compData;

  const teamsData: Promise<Team[]> = getMyTeams();
  const teams = await teamsData;

  return (
    <Card className="mt-8 ">
      <CardHeader>
        <CardTitle>
          Select team to register to {comp.competition_name}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <SelectTeamForm teams={teams} compId={compId} />
      </CardContent>
    </Card>
  );
};

export default SingleCompPage;
