import { Card, CardContent } from "@/components/ui/card";
import { getAllComps } from "@/lib/fetch-data/competitions";
import Image from "next/image";

// {
//     id: '754963d5-37ac-496a-91c9-0014891d4f64',
//     competition_type: 'Tournament',
//     competition_name: 'Rausha Kipaji',
//     created_at: '2023-11-24',
//     start_period: '2023-11-01',
//     end_period: '2023-11-30',
//     teams: []
//   }

const Competitions = async () => {
  const compsData: Promise<Competition[]> = getAllComps();
  const competitions = await compsData;

  console.log(competitions);

  return (
    <Card className="">
      <div className="flex items-center justify-between p-2">
        <h1>Competition</h1>
        <h1>Season</h1>
        <h1>Teams</h1>
      </div>

      <CardContent className="p-0 space-y-2 m-2">
        {competitions.map((comp) => (
          <div
            key={comp.id}
            className="flex justify-between items-center gap-2 p-2 border rounded-md"
          >
            <div className="flex items-center gap-1">
              <Image src="/afc-logo.png" alt="" width={45} height={45} />
              <div className="flex flex-col">
                <h1>{comp.competition_name}</h1>
                <p>{comp.competition_type}</p>
              </div>
            </div>
            <div>23/23</div>
            <div>{comp.teams.length}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Competitions;
