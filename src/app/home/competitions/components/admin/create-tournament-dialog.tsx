import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const CreateTournamentDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 ml-2" /> Tournament
        </Button>
      </DialogTrigger>

      <DialogContent>form</DialogContent>
    </Dialog>
  );
};

export default CreateTournamentDialog;
