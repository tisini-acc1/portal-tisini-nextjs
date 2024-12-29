import { Card } from "@/components/ui/card";
import { StatRow } from "./general-stats";

const DisciplineStats = () => {
  return (
    <Card className="space-y-8 md:w-[440px] md:mx-auto p-2">
      <div>
        <h4 className="text-center bg-secondary">Tackles</h4>
        <StatRow hStat={2} title={"Won"} aStat={4} />
        <StatRow hStat={3} title={"Lost"} aStat={2} />
      </div>

      <div>
        <h4 className="text-center bg-secondary">Ariel Duels</h4>
        <StatRow hStat={2} title={"Won"} aStat={4} />
        <StatRow hStat={3} title={"Lost"} aStat={2} />
      </div>

      <div>
        <h4 className="text-center bg-secondary">Fouls</h4>
        <StatRow hStat={2} title={"Committed"} aStat={4} />
        <StatRow hStat={3} title={"Won"} aStat={2} />
      </div>

      <div>
        <h4 className="text-center bg-secondary">Cards</h4>
        <StatRow hStat={2} title={"Yellow"} aStat={4} />
        <StatRow hStat={3} title={"Red"} aStat={2} />
      </div>
    </Card>
  );
};

export default DisciplineStats;
