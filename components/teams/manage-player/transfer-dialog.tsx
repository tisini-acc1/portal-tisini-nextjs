import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type TransferProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const TransferDialog = ({ open, setOpen }: TransferProps) => {
  const form = useForm({});

  const onOpenChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="hidden">
          Transfer
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer</DialogTitle>
          <DialogDescription>Select team to transfer player</DialogDescription>
        </DialogHeader>
      </DialogContent>

      <Form {...form}>
        <form></form>
      </Form>
    </Dialog>
  );
};

export default TransferDialog;
