import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";

const EditFixtureModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Edit className="w-4 h-4" color="#25f609" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>editing fixture</DialogTitle>
      </DialogContent>
    </Dialog>
  );
};

export default EditFixtureModal;
