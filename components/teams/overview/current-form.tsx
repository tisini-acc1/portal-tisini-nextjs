import { Activity } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const CurrentForm = ({ recentForm }: { recentForm: string[] }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Current Form</CardTitle>
        <Activity className="text-muted-foreground h-5 w-5" />
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-x-1">
          <div className="border p-1 flex justify-evenly">
            <span className="text-muted-foreground font-bold">GF</span>
            <span>0</span>
          </div>
          <div className="border p-1 flex justify-evenly">
            <span className="text-muted-foreground font-bold">GA</span>
            <span>0</span>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-1">
          <SnapBox title={recentForm[0]} />
          <SnapBox title={recentForm[1]} />
          <SnapBox title={recentForm[2]} />
          <SnapBox title={recentForm[3]} />
          <SnapBox title={recentForm[4]} />
        </div>
      </CardContent>
    </Card>
  );
};

const SnapBox = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col gap-2 p-2 items-center justify-center border rounded-sm">
      <Avatar className="w-8 h-8">
        <AvatarFallback
          className={cn(
            title === "W"
              ? "bg-green-400"
              : title === "L"
              ? "bg-red-400"
              : title === "D"
              ? "bg-yellow-300"
              : ""
          )}
        >
          {title}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
