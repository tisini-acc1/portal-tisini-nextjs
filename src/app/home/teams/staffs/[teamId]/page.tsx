import { getTeam } from "@/lib/fetch-data/teams";
import TeamsHeader from "../../components/teams-header";
import { StaffsTable } from "../components/staffs-table";
import { columns } from "../components/columns";
import { getAllStaffs } from "@/lib/fetch-data/staffs";

type ParamsProps = {
  params: {
    teamId: string;
  };
};

const TeamStaffsPage = async ({ params: { teamId } }: ParamsProps) => {
  const teamData: Promise<Team> = getTeam(teamId);
  const team = await teamData;

  const staffsData: Promise<Staff[]> = getAllStaffs(teamId);
  const staffs = await staffsData;

  return (
    <main className="space-y-2">
      <TeamsHeader
        title="player"
        team={team}
        url="/home/teams/staffs/add-new"
      />

      <section className="">
        <StaffsTable columns={columns} data={staffs} />
      </section>
    </main>
  );
};

export default TeamStaffsPage;
