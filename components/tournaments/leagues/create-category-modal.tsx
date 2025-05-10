"use client";

import { z } from "zod";
import { useEffect } from "react";
// import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { Plus, RotateCcw } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createCategory } from "@/actions/php-actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useStore } from "@/store/store";

export const fixtureSchema = z.object({
  category: z.string().min(1, { message: "Category name is required" }),
});

type CategoryProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const AddCategoryModal = ({ open, setOpen }: CategoryProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const serieId = useStore((state) => state.store.serie);

  const form = useForm<z.infer<typeof fixtureSchema>>({
    resolver: zodResolver(fixtureSchema),
    defaultValues: {
      category: "",
    },
  });

  useEffect(() => {
    if (form.formState.errors) {
      console.log("Validation errors:", form.formState.errors);
    }
  }, [form.formState.errors]);

  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess(data) {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["tournaments"] });
      setOpen(false);
      toast({ title: "Success", description: data.message });

      if (data.error === "0") {
      } else if (data.error === "1") {
        toast({
          title: "Error!",
          variant: "destructive",
          description: data.message,
        });
      }
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "Error!",
        variant: "destructive",
        description: "An error occured while creating tournament",
      });
    },
  });

  async function onSubmit(values: z.infer<typeof fixtureSchema>) {
    const category = {
      seasonid: serieId,
      cname: values.category,
    };

    console.log(category);
    mutation.mutate(category);
  }

  const onOpenChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogTrigger asChild>
        <Button size="sm" className="hidden">
          <Plus className="mr-2 w-5 h-5" /> Tournament
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            You are about to create a new category for tournament.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="U15" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="p-0">
              <Button
                className="w-full"
                onClick={form.handleSubmit(onSubmit)}
                disabled={form.formState.isSubmitting}
              >
                Create category{" "}
                {mutation.isPending && (
                  <RotateCcw className="ml-2 h-4 w-4 animate-spin" />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
