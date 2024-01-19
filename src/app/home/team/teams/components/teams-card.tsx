"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

const TeamsCard = ({ team, path }: { team: Team; path: string }) => {
  const router = useRouter();

  return (
    <Card
      className="cursor-pointer"
      onClick={() => router.push(`${path}/${team.id}`)}
    >
      <CardContent>
        <Image src="/logo-placeholder.png" alt="" width={100} height={100} />
      </CardContent>

      <CardHeader>
        <CardTitle>{team.team_name}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default TeamsCard;
