import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateStaffForm from "../../components/create-staff-form";
import { getTeam } from "@/lib/fetch-data/teams";

type StaffProps = {
  params: {
    teamId: string;
  };
};

const AddStaffPage = async ({ params: { teamId } }: StaffProps) => {
  const teamData: Promise<Team> = getTeam(teamId);
  const team = await teamData;

  return (
    <main className="m-auto">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Add Staff for {team.team_name}</CardTitle>
        </CardHeader>

        <CardContent>
          <CreateStaffForm teamId={teamId} />
        </CardContent>
      </Card>
    </main>
  );
};

export default AddStaffPage;
