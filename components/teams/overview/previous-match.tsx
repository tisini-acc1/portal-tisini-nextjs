import { CalendarX2 } from "lucide-react";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PreviousMatch = ({ fixture }: { fixture: Fixture }) => {
  const { store } = useStore((state) => state);
  const teamId = store.team.id;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Previous Match</CardTitle>
        <CalendarX2 />
      </CardHeader>
      <CardContent className="space-y-4 pt-2 font-mono">
        {fixture ? (
          <>
            <div className="flex items-center gap-4">
              <p className="text-3xl">Vs</p>
              <div className="">
                <p>
                  {fixture.team1_id === teamId
                    ? fixture.team2_name
                    : fixture.team1_name}
                </p>
                <p className="font-thin text-muted-foreground">
                  {fixture.team1_id === teamId ? "Home" : "Away"}
                </p>
              </div>
            </div>

            <p className="text-gray-400 capitalize text-end">Result</p>
          </>
        ) : (
          <div className="text-center text-muted-foreground pt-6">
            No match!
          </div>
        )}
      </CardContent>
    </Card>
  );
};
