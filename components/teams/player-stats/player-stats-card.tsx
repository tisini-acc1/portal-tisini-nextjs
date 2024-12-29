import { HeightIcon } from "@radix-ui/react-icons";
import { CalendarDays, Footprints, Target, Weight } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReactNode } from "react";

export const PlayerStatsCard = () => {
  return (
    <Card>
      <CardHeader className="p-2">
        <Card className="grid md:grid-cols-2 p-2 space-y-1">
          <div className="flex gap-2">
            <div className="border rounded-sm flex p-2 md:p-4 items-center justify-center">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>PS</AvatarFallback>
              </Avatar>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-1">
                <div className="bg-secondary rounded-full text-xs p-1">10</div>
                <span className="text-sm font-semibold whitespace-nowrap">
                  M. Rashford
                </span>
              </div>

              <DetailRow
                icon={<Target className="h-4 w-4" />}
                title="Midfielder"
              />

              <DetailRow
                icon={<CalendarDays className="h-4 w-4" />}
                title="Age 35"
              />

              <DetailRow
                icon={<Footprints className="h-4 w-4" />}
                title="Right Foot"
              />

              <DetailRow
                icon={<HeightIcon className="h-4 w-4" />}
                title="185 Cm"
              />

              <DetailRow icon={<Weight className="h-4 w-4" />} title="70 Kg" />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-1">
            <StatsBox title="Mins played" stat={76} />
            <StatsBox title="Goals" stat={0} />
            <StatsBox title="Assists" stat={2} />
            <StatsBox title="Rating" stat={7.6} />
          </div>
        </Card>
      </CardHeader>

      <CardContent className="grid md:grid-cols-3 gap-4 p-2">
        <Card className="space-y-4 p-2">
          <CardHeader className="p-0 px-1 rounded-sm bg-accent">
            General
          </CardHeader>

          <StatRow stat={2} aStat={1} title="Shots / on target" acc="50%" />
          <StatRow stat={2} aStat={1} title="Crosses / successful" acc="50%" />
          <StatRow stat={2} title="Key Passes" />
          <StatRow stat={2} aStat={1} title="Dribbles / successful" acc="50%" />
          <StatRow stat={1} title="Offside" />
          <StatRow stat={2} title="Freekick taken" />
          <StatRow stat={2} title="Fouls won 1/3" />
        </Card>

        <Card className="space-y-4 p-2">
          <CardHeader className="p-0 px-1 rounded-sm bg-accent">
            Posession
          </CardHeader>

          <StatRow stat={25} aStat={12} title="Passes / accurate" acc="50%" />
          <StatRow
            stat={2}
            aStat={1}
            title="Prog passes / accurate"
            acc="50%"
          />
          <StatRow stat={1} title="Ball won" />
          <StatRow stat={2} title="Throw-in" />
          <StatRow stat={2} title="Goal kick" />
        </Card>

        <Card className="space-y-4 p-2">
          <CardHeader className="p-0 px-1 rounded-sm bg-accent">
            Defense
          </CardHeader>

          <StatRow stat={1} title="Clearances" />
          <StatRow stat={2} title="Blocks" />
          <StatRow stat={2} title="Interceptions" />
          <StatRow stat={2} title="Ball lost" />
          <StatRow
            stat={25}
            aStat={12}
            title="Tackles / successful"
            acc="50%"
          />
          <StatRow stat={2} title="Ariel duels / successful" />
          <StatRow title="Fouls committed" stat={1} aStat={1} acc="100%" />
          <StatRow title="Cards / yellow" stat={1} aStat={1} />
        </Card>
      </CardContent>
    </Card>
  );
};

type RowProps = {
  stat: number;
  aStat?: number;
  title: string;
  acc?: string;
};

export const StatRow = ({ stat, aStat, title, acc }: RowProps) => {
  return (
    <div className="flex justify-between border-b pl-2 pr-2">
      <div className="text-xs font-semibold">{title}</div>

      <div className="text-center text-muted-foreground">
        {stat} / {aStat}
        <span className="ml-4">{acc}</span>
      </div>
    </div>
  );
};

type DetailProps = {
  icon: ReactNode;
  title: string;
};

export const DetailRow = ({ icon, title }: DetailProps) => {
  return (
    <div className="flex items-center space-x-1">
      <div className="bg-secondary p-1 rounded-full">{icon}</div>
      <span className="text-xs font-semibold text-muted-foreground">
        {title}
      </span>
    </div>
  );
};

type StatsBoxProps = {
  title: string;
  stat: number;
};

export const StatsBox = ({ title, stat }: StatsBoxProps) => {
  return (
    <div className="border rounded-md space-y-2 p-1">
      <p className="text-[0.6rem] font-semibold">{title}</p>
      <div className="bg-secondary rounded-md text-center">{stat}</div>
    </div>
  );
};
