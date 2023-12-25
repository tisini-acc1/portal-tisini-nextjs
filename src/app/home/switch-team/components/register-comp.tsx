import { Card, CardContent } from "@/components/ui/card";
import { getAllComps } from "@/lib/fetch-data/competitions";
import RegisterCompForm from "./register-comp-form";

const RegisterComp = async () => {
  const compsData: Promise<Competition[]> = getAllComps();
  const competitions = await compsData;

  console.log(competitions);

  return (
    <Card>
      <CardContent>
        <RegisterCompForm comps={competitions} />
      </CardContent>
    </Card>
  );
};

export default RegisterComp;
