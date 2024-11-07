import SelectTeamForm from "./select-team-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

export const RegToComp = ({ teams, comp }: { teams: Team[]; comp: Comp }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Register</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          Select team to register to {comp.competition_name}
        </DialogHeader>

        <div className="mt-4">
          <SelectTeamForm teams={teams} compId={comp.id} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
