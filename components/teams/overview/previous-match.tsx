import Image from "next/image";
import { CalendarX2 } from "lucide-react";

import { useStore } from "@/store/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PreviousMatch = ({ fixture }: { fixture: Fixture }) => {
  const { store } = useStore((state) => state);
  const teamId = store.team.id;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Previous Match</CardTitle>
        <CalendarX2 className="text-muted-foreground h-5 w-5" />
      </CardHeader>
      <CardContent className="space-y-4 pt-2 font-mono">
        {Object.keys(fixture).length > 0 ? (
          <>
            <div className="flex items-center gap-4">
              {/* <p className="text-3xl">Vs</p> */}
              <Image src={"/vs.png"} alt="versus" height={50} width={50} />
              <div className="">
                <p className="">
                  {fixture.team1_id === teamId
                    ? fixture.team2_name
                    : fixture.team1_name}
                </p>
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <p className="text-xs text-muted-foreground">
                {fixture.team1_id === teamId ? "Home" : "Away"}
              </p>
              <p className="text-gray-400 capitalize">Result</p>
            </div>
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
