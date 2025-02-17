import { ChartNoAxesCombined } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SeasonSnapshot = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Season Snapshot</CardTitle>
        <ChartNoAxesCombined className="text-muted-foreground h-5 w-5" />
      </CardHeader>

      <CardContent className="grid grid-cols-3 gap-1">
        <SnapBox title="W" stat={0} />
        <SnapBox title="D" stat={0} />
        <SnapBox title="L" stat={0} />
      </CardContent>
    </Card>
  );
};

const SnapBox = ({ title, stat }: { title: string; stat: number }) => {
  return (
    <div className="flex flex-col gap-2 p-2 items-center justify-center border rounded-sm">
      <Avatar>
        <AvatarFallback>{title}</AvatarFallback>
      </Avatar>
      <span className="text-xl font-bold">{stat}</span>
    </div>
  );
};
