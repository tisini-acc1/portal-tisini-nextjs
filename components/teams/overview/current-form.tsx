import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const CurrentForm = ({ recentForm }: { recentForm: string[] }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Current Form</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
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
