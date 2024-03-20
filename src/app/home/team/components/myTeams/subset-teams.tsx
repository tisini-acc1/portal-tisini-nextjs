import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

const SubsetTeams = ({ subsetTeams }: { subsetTeams: Team[] }) => {
  if (subsetTeams.length === 0) return <div>No teams available</div>;

  return (
    <div className="mt-4 p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {subsetTeams.map((team) => (
          <Card
            key={team.id}
            className="p-0 hover:bg-accent hover:cursor-pointer"
          >
            <CardContent className="flex items-center gap-2 p-2">
              <Image
                src="/logo-placeholder.png"
                alt=""
                width={70}
                height={70}
              />
              <div className="flex flex-col">
                <h1>{team.team_name}</h1>
                <p>{team.team_type}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubsetTeams;
