import { Card } from "@/components/ui/card";
import { StatRow } from "./general-stats";

const DefenseStats = () => {
  return (
    <Card className="space-y-8 md:w-[440px] md:mx-auto p-2">
      <StatRow hStat={1} title="Clearances" aStat={2} />

      <StatRow hStat={1} title="Blocks" aStat={2} />

      <StatRow hStat={1} title="Interceptions" aStat={2} />

      <StatRow hStat={1} title="Saves" aStat={2} />

      <div>
        <h4 className="text-center bg-secondary">Runouts</h4>
        <StatRow hStat={2} title={"Complete"} aStat={4} />
        <StatRow hStat={3} title={"Incomplete"} aStat={2} />
      </div>

      <div>
        <h4 className="text-center bg-secondary">Claims</h4>
        <StatRow hStat={2} title={"Catch"} aStat={4} />
        <StatRow hStat={3} title={"Punch"} aStat={2} />
        <StatRow hStat={1} title={"Drop"} aStat={0} />
        <StatRow hStat={1} title={"Miss"} aStat={0} />
      </div>

      <div>
        <h4 className="text-center bg-secondary">Ball</h4>
        <StatRow hStat={2} title={"Won"} aStat={4} />
        <StatRow hStat={3} title={"Lost"} aStat={2} />
      </div>
    </Card>
  );
};

export default DefenseStats;
