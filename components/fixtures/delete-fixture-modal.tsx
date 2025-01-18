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
      <DialogTrigger asChild className="hidden">
        <Button size="icon" variant="outline">
          <Trash2 className="w-4 h-4" color="#fa0000" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>deleting fixture</DialogTitle>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteFixtureModal;
