// import { getTournaments } from "@/actions/php-actions";

import { getTeamHistory } from "@/actions/php-actions";

const DashboardPage = async () => {
  const data = await getTeamHistory("1867");

  console.log(data);

  return <div>DashboardPage</div>;
};

export default DashboardPage;
