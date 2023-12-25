import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateStaffForm from "../components/create-staff-form";

const AddStaffPage = () => {
  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>Add Staff</CardTitle>
        </CardHeader>

        <CardContent>
          <CreateStaffForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default AddStaffPage;
