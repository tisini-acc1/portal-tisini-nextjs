import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SeasonSnapshot = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Season Snapshot</CardTitle>
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
