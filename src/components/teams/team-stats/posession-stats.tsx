import { StatRow } from "./general-stats";
import { Card } from "@/components/ui/card";

const PosessionStats = () => {
  return (
    <Card className="space-y-8 md:w-[440px] md:mx-auto p-2">
      <div>
        <h4 className="text-center bg-secondary">Passes</h4>
        <StatRow hStat={2} title={"Complete"} aStat={4} />
        <StatRow hStat={3} title={"Incomplete"} aStat={2} />
      </div>

      <div>
        <h4 className="text-center bg-secondary">Progressive passes</h4>
        <StatRow hStat={2} title={"Complete"} aStat={4} />
        <StatRow hStat={3} title={"Incomplete"} aStat={2} />
      </div>

      <div>
        <h4 className="text-center bg-secondary">Goal kicks</h4>
        <StatRow hStat={2} title={"Long"} aStat={4} />
        <StatRow hStat={3} title={"Short"} aStat={2} />
      </div>

      <div>
        <h4 className="text-center bg-secondary">Kick-outs</h4>
        <StatRow hStat={2} title={"Complete"} aStat={4} />
        <StatRow hStat={3} title={"Incomplete"} aStat={2} />
      </div>

      <div>
        <h4 className="text-center bg-secondary">Throw-outs</h4>
        <StatRow hStat={2} title={"Complete"} aStat={4} />
        <StatRow hStat={3} title={"Incomplete"} aStat={2} />
      </div>
    </Card>
  );
};

export default PosessionStats;
