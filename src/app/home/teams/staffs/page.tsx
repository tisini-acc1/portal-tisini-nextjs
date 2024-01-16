import { getAllStaffs } from "@/lib/fetch-data/staffs";
import Header from "../../../components/header";
import { StaffsTable } from "./components/staffs-table";
import { columns } from "./components/columns";

const StaffsPage = async () => {
  const staffsData: Promise<Staff[]> = getAllStaffs();
  const staffs = await staffsData;

  // console.log(staffs);
  return (
    <main className="space-y-2">
      <Header title="Staff" url="/home/team/staffs/add-new" />

      <section>
        <StaffsTable columns={columns} data={staffs} />
      </section>
    </main>
  );
};

export default StaffsPage;
