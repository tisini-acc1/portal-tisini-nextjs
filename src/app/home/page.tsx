import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/options";
import NavigationCard from "@/components/home/navigation-card";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  // console.log(session?.user);

  if (session && session.user) {
    // destructure user_role
    const {
      user: { user_role },
    } = session;

    if (user_role === "is_competition_owner") {
      return <NavigationCard url={"/competition"} />;
    } else if (user_role === "is_team_staff") {
      return <NavigationCard url={"/team"} />;
    } else if (user_role === "is_tisini_staff") {
      return <NavigationCard url={"/tisini"} />;
    } else if (user_role === "is_player") {
      return <NavigationCard url={"/player"} />;
    } else if (user_role === "is_referee") {
      return <NavigationCard url={"/referee"} />;
    } else if (user_role === "is_agent") {
      return <NavigationCard url={"/agent"} />;
    }
  }
};

export default HomePage;
