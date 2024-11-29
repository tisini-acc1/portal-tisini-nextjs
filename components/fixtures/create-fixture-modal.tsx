import { Plus, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const CreateFixtureModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 w-5 h-5" /> Fixture
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>editing fixture</DialogTitle>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFixtureModal;
