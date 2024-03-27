import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const UpcomingMatch = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Up Next</CardTitle>
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
      <CardContent className="flex flex-row justify-evenly items-center">
        <div className="flex flex-col ">
          <Avatar>
            <AvatarImage src="https://logos-world.net/wp-content/uploads/2020/06/Manchester-United-logo.png" />
          </Avatar>
          <span className="text-sm">Manchester United</span>
        </div>

        <div>2-2</div>

        <div className="items-center justify-center flex flex-col">
          <Avatar>
            <AvatarImage src="https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png" />
          </Avatar>
          <p>Manchester City</p>
        </div>
      </CardContent>
    </Card>
  );
};
