import { Card } from "@/components/ui/card";

const GeneralStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="space-y-8 md:w-[440px] md:mx-auto p-2">
        <StatRow hStat={1} title="Assists" aStat={2} />

        <StatRow hStat={1} title="Key Passes" aStat={2} />
      </Card>

      <Card className="space-y-8 md:w-[440px] md:mx-auto p-2">
        <StatRow hStat={1} title="Throw-in" aStat={2} />

        <StatRow hStat={1} title="Offsides" aStat={2} />
      </Card>

      <Card className="space-y-4 md:w-[440px] md:mx-auto p-2">
        <h4 className="text-center bg-secondary">Attemps</h4>
        <StatRow hStat={2} title={"On Target"} aStat={4} />
        <StatRow hStat={3} title={"Off Target"} aStat={2} />
        <StatRow hStat={1} title={"Blocked"} aStat={0} />
      </Card>

      <Card className="space-y-4 md:w-[440px] md:mx-auto p-2">
        <h4 className="text-center bg-secondary">Crosses</h4>
        <StatRow hStat={2} title={"In-swinger"} aStat={4} />
        <StatRow hStat={3} title={"Out-swinger"} aStat={2} />
        <StatRow hStat={1} title={"Blocked"} aStat={0} />
      </Card>

      <Card className="space-y-4 md:w-[440px] md:mx-auto p-2">
        <h4 className="text-center bg-secondary">Corner Kicks</h4>
        <StatRow hStat={2} title={"On Target"} aStat={4} />
        <StatRow hStat={3} title={"Off Target"} aStat={2} />
        <StatRow hStat={1} title={"Blocked"} aStat={0} />
      </Card>

      <Card className="space-y-4 md:w-[440px] md:mx-auto p-2">
        <h4 className="text-center bg-secondary">Dribbles</h4>
        <StatRow hStat={2} title={"Complete"} aStat={4} />
        <StatRow hStat={3} title={"In-complete"} aStat={2} />
      </Card>
    </div>
  );
};

export default GeneralStats;

type RowProps = {
  hStat: number;
  title: string;
  aStat: number;
};

export const StatRow = ({ hStat, title, aStat }: RowProps) => {
  return (
    <div className="flex justify-between border-b pl-2 pr-2">
      <div className="text-center">{hStat}</div>
      <div className="">{title}</div>
      <div className="text-center">{aStat}</div>
    </div>
  );
};
