import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const StaffsPage = async () => {
  const session = await getServerSession(authOptions);

  console.log(session);

  return <div>StaffsPage</div>;
};

export default StaffsPage;
