import { getTournamentOverview } from "@/actions/django-actions";
import OverviewCards from "@/components/tournaments/overview-cards";

const TournamentsPage = async () => {
  const data = await getTournamentOverview();

  console.log("tournament", data);

  return (
    <main>
      <OverviewCards overviewData={data} />
    </main>
  );
};

export default TournamentsPage;
