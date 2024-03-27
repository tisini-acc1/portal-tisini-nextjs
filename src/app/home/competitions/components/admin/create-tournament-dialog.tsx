"use client";

import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { CalendarIcon, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAxiosAuth from "@/lib/hooks/use-axios-auth";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const compSchema = z.object({
  name: z.string(),
  type: z.string(),
  startDate: z.string().min(3, { message: "Please enter a valid date" }),
  endDate: z.string().min(3, { message: "Please enter a valid date" }),
});

type compInput = z.infer<typeof compSchema>;

const CreateTournamentDialog = () => {
  const [open, setOpen] = useState(false);
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<compInput>({
    resolver: zodResolver(compSchema),
    defaultValues: {
      name: "",
      type: "",
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = async (values: compInput) => {
    const comp = {
      competition: {
        competition_type: values.type,
        competition_name: values.name,
        start_period: format(values.startDate, "yyyy-MM-dd"),
        end_period: format(values.endDate, "yyyy-MM-dd"),
        parent: null,
      },
    };

    try {
      const res = await axiosAuth.post("/api/register_competition/", comp);

      if (res.status === 201) {
        toast({ description: "Created" });
        form.reset();
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={openChangeWrapper}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" /> Tournament
        </Button>
      </DialogTrigger>

      <DialogContent>
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
            <FormField
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
            />

            {/* </div> */}

            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Create</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTournamentDialog;
