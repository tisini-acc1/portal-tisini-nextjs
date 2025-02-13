import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/lib/store";

export const PreviousMatch = ({ fixture }: { fixture: Fixture }) => {
  const { store } = useStore((state) => state);
  const teamId = store.team.id;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Previous Match</CardTitle>
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
              {fixture.team1_id === teamId
                ? fixture.team2_name
                : fixture.team1_name}
            </p>
            <p>{fixture.team1_id === teamId ? "Home" : "Away"}</p>
          </div>
        </div>

        <p className="text-gray-400 capitalize text-end">won 2-0</p>
      </CardContent>
    </Card>
  );
};
