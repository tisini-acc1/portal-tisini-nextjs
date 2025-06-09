"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { PlusSquareIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const AddCommentModal = () => {
  const form = useForm({ defaultValues: { comment: "" } });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5 text-indigo-600 hover:text-indigo-700 border-indigo-300 hover:border-indigo-400"
        >
          <PlusSquareIcon className="w-4 h-4" />
          <span>Add comment</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Comment</DialogTitle>
          <DialogDescription>add comment for agent x</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form action="">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <Label>Comment</Label>

                  <FormControl>
                    <Textarea
                      placeholder="comment about agents performance on the match..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          <DialogFooter className="p-0">
            <Button
              className="w-full"
              // onClick={form.handleSubmit(onSubmit)}
              disabled={form.formState.isSubmitting}
            >
              Add Comment{" "}
              {/* {form.formState.isSubmitting && (
                              <RotateCcw className="ml-2 h-4 w-4 animate-spin" />
                            )} */}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCommentModal;
