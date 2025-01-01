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
      <CardContent className="space-y-4 pt-2 font-mono">
        <div className="flex items-center gap-4">
          <p className="text-3xl">Vs</p>
          <div className="">
            <p>
              {/* {user.teamName === fixture.team1_name
                ? fixture.team2_name
                : fixture.team1_name} */}
              Mumbai United
            </p>
            <p>
              {/* {user.teamName === fixture.team1_name ? "Home" : "Away"} */}
              Away
            </p>
          </div>
        </div>

        <p className="text-gray-400">28 August, 2024</p>
      </CardContent>
    </Card>
  );
};
