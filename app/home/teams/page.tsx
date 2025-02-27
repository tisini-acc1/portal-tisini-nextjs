// import { getToken } from "@/actions/actions";
// import { getTeamOverview } from "@/actions/django-actions";
import { getTeamOverview } from "@/actions/django-actions";
import TeamOverview from "@/components/teams/overview/team-overview";
// import TeamPageComponent from "./teams-page";

// const fetchTeamOverview = async () => {
//   const token = await getToken();
//   const baseURL = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

//   try {
//     const res = await fetch(`${baseURL}/api/team_overview/${token}/`);

//     // Check if the response is successful (status 200-299)
//     if (!res.ok) {
//       // You can inspect the response status and message
//       const errorMessage = `Failed to fetch user teams: ${res.status} ${res.statusText}`;
//       throw new Error(errorMessage);
//     }

//     return res.json();
//   } catch (error: any) {
//     // Handle both fetch/network errors and any thrown errors
//     if (error instanceof Error) {
//       console.error("Error occurred during fetch: ", error.message);
//     } else {
//       // This will catch any non-Error objects (for example, undefined)
//       console.error("Unknown error occurred", error);
//     }
//     throw new Error(
//       error.message || "An unknown error occurred while fetching team overview."
//     );
//   }
// };

const TeamsPage = async () => {
  const data = await getTeamOverview();

  console.log("overview: ", data);

  return <TeamOverview overviewData={data} />;
};

export default TeamsPage;
