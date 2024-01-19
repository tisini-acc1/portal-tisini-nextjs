"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

const Competitions = ({ comps }: { comps: Competition[] }) => {
  const router = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Competition</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Period</TableHead>
          <TableHead>Teams</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {comps.map((comp) => (
          <TableRow key={comp.id}>
            <TableCell>{comp.competition_name}</TableCell>
            <TableCell>{comp.competition_type}</TableCell>
            <TableCell>
              {comp.start_period} to {comp.end_period}
            </TableCell>
            <TableCell>{comp.teams.length}</TableCell>
            <TableCell>
              <Button
                onClick={() =>
                  router.push(`/home/admin-area/competitions/${comp.id}`)
                }
              >
                Enter
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Competitions;
