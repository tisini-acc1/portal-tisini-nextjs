import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/options";
import NavigationCard from "@/components/home/navigation-card";

// interface Session {
//   user: {
//     user_role: string;
//     // other properties...
//   };
//   access_token: string;
//   exp: number;
//   refresh_token: string;
//   // other properties...
// }
type User = {
  user_role: string;
};

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session?.user);
  if (session && session.user) {
    const { user } = session;
    if (user.user_role === "is_competition_owner") {
      return <NavigationCard url={"/competition"} />;
    } else if (session.user.user_role === "is_team_staff") {
      return <NavigationCard url={"/team"} />;
    } else if (session.user.user_role === "is_tisini_staff") {
      return <NavigationCard url={"/tisini"} />;
    } else if (session.user.user_role === "is_player") {
      return <NavigationCard url={"/player"} />;
    } else if (session.user.user_role === "is_referee") {
      return <NavigationCard url={"/referee"} />;
    } else if (session.user.user_role === "is_agent") {
      return <NavigationCard url={"/agent"} />;
    }
  }
};

export default HomePage;
