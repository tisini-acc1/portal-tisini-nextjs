// import { getToken } from "@/actions/actions";
// import { getAllPlayers } from "@/actions/php-actions";
import TeamPlayers from "@/components/teams/players/team-players";

// const fetchPlayers = async (teamId: number, token: string) => {
//   const res = await fetch("https://apis.tisini.co.ke/api38.php", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json", // Set content type to JSON
//     },
//     body: JSON.stringify({
//       action: "teamplayers",
//       teamid: teamId,
//       gettoken: "6c92f7ad05bf62eccda549f7c23f64a0",
//     }),
//   });

//   if (!res.ok) {
//     console.log(error);
//   }

//   return await res.json();
// };

const TeamPlayersPage = async () => {
  // const token = await getToken();
  // const data = await fetchPlayers(1, token as string);

  // console.log("players:", data);

  return <TeamPlayers />;
};

export default TeamPlayersPage;
