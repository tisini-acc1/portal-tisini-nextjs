"use client";

import { Edit3Icon } from "lucide-react";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const EditJerseyModal = ({ player }: { player: Lineup }) => {
  const form = useForm({
    defaultValues: {
      jersey: player.Jersey_No,
    },
    mode: "onChange",
  });

  const onSubmit = (values: { jersey: string }) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"outline"} className="rounded-full">
          <Edit3Icon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            You are about to change {player.pname}&apos;s jersey number
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="jersey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jersey</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditJerseyModal;
