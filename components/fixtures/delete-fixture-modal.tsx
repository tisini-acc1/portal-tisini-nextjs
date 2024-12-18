import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

const DeleteFixtureModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Trash2 className="w-4 h-4" color="#25f609" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>deleting fixture</DialogTitle>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteFixtureModal;
