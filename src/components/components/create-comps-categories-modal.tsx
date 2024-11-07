"use client";

import { z } from "zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CalendarIcon, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/hooks/use-axios-auth";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

type CompProps = { competition: Competition | undefined };

const compSchema = z.object({
  name: z.string().min(3, { message: "Please enter a valid name" }),
  type: z.string().min(3, { message: "Competition type is required" }),
  // startDate: z.string().min(3, { message: "Please enter a valid date" }),
  // endDate: z.string().min(3, { message: "Please enter a valid date" }),
});

type compInput = z.infer<typeof compSchema>;

const CreateCompCategoryModal = ({ competition }: CompProps) => {
  const [open, setOpen] = useState(false);
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<compInput>({
    resolver: zodResolver(compSchema),
    defaultValues: {
      name: "",
      type: "",
      // startDate: competition?.start_period,
      // endDate: competition?.end_period,
    },
  });

  const onSubmit = async (values: compInput) => {
    const comp = {
      competition: {
        competition_type: values.type,
        competition_name: values.name,
        start_period: competition?.start_period,
        end_period: competition?.end_period,
        // start_period: format(values.startDate, "yyyy-MM-dd"),
        // end_period: format(values.endDate, "yyyy-MM-dd"),
        parent: competition?.id,
      },
    };
    console.log(comp);
    try {
      const res = await axiosAuth.post("/api/register_competition/", comp);

      if (res.status === 201) {
        toast({ description: "Created" });
        form.reset();
        router.refresh();
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onOpenChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" /> Category
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          Add a tournament category to {competition?.competition_name}
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Competition name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Wabebe Cup" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="type"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Competition type</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Tournament" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <div className="flex"> */}
            {/* <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date:</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="12/12/1919" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date:</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="12/12/1919" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* </div> */}

            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" onSubmit={form.handleSubmit(onSubmit)}>
                  Create
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCompCategoryModal;
