import { getRefreeFixtures } from "@/actions/php-actions";
import { OfficialsFixTable } from "./fixtures-table";
import { columns } from "./columns";

const MatchOfficialsPage = async () => {
  const data = await getRefreeFixtures();

  return (
    <main>
      <section>
        <OfficialsFixTable data={data} columns={columns} />
      </section>
    </main>
  );
};

export default MatchOfficialsPage;
