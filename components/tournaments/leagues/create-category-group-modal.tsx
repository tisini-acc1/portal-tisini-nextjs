"use client";

import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Plus, RotateCcw } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// import { useStore } from "@/store/store";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createGroupCategory } from "@/actions/php-actions";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const fixtureSchema = z.object({
  category: z.string().min(1, { message: "Category name is required" }),
  group: z.string().min(1, { message: "Group name is required" }),
});

type CategoryProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
  categories: CompCategory[];
};

const AddCategoryGroupModal = ({
  open,
  setOpen,
  categories,
}: CategoryProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // const serieId = useStore((state) => state.store.serie);

  const form = useForm<z.infer<typeof fixtureSchema>>({
    resolver: zodResolver(fixtureSchema),
    defaultValues: {
      category: "",
      group: "",
    },
  });

  useEffect(() => {
    if (form.formState.errors) {
      console.log("Validation errors:", form.formState.errors);
    }
  }, [form.formState.errors]);

  const mutation = useMutation({
    mutationFn: createGroupCategory,
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
    const group = {
      gname: values.group,
      categoryid: values.category,
    };

    console.log(group);
    mutation.mutate(group);
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
          <DialogTitle>Add Group Category</DialogTitle>
          <DialogDescription>
            You are about to create a new group for category.
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="U15" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.categoryname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group</FormLabel>
                  <FormControl>
                    <Input placeholder="Group F" {...field} />
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

export default AddCategoryGroupModal;
