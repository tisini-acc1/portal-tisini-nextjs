"use client";

import { z } from "zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, RotateCcw } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { createTournament } from "@/actions/php-actions";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
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
  tournament: z.string().min(1, { message: "Tournament name is required" }),
  fixType: z.string().min(4, { message: "Fixture type is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  //   startDate: z.date({
  //     required_error: "Tournament start date is required.",
  //   }),
  //   endDate: z.date({
  //     required_error: "Tournament end date is required.",
  //   }),
});

const CreateTournamentModal = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof fixtureSchema>>({
    resolver: zodResolver(fixtureSchema),
    defaultValues: {
      tournament: "",
      position: "",
      fixType: "",
      //   startDate: new Date(),
    },
  });

  useEffect(() => {
    if (form.formState.errors) {
      console.log("Validation errors:", form.formState.errors);
    }
  }, [form.formState.errors]);

  const mutation = useMutation({
    mutationFn: createTournament,
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
    const date = format(new Date(), "yyyy-M-d");
    const tournament = {
      name: values.tournament,
      fixtype: values.fixType,
      from: date,
      to: date,
      position: values.position,
    };
    console.log(tournament);
    mutation.mutate(tournament);
  }

  const onOpenChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 w-5 h-5" /> Tournament
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Tournament</DialogTitle>
          <DialogDescription>Tournament creation</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="tournament"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tournament</FormLabel>
                  <FormControl>
                    <Input placeholder="five-fifteen tournament" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fixType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tournament Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Rugby 15s" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="rugby15">Rugby 15s</SelectItem>
                      <SelectItem value="rugby7">Rugby 7s</SelectItem>
                      <SelectItem value="football">Football</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chairman" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="chairman">Chairman</SelectItem>
                      <SelectItem value="ceo">CEO</SelectItem>
                      <SelectItem value="secretary">Secretary</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="mb-3">Fixture Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="mb-3">Fixture Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <DialogFooter className="p-0">
              <Button
                className="w-full"
                onClick={form.handleSubmit(onSubmit)}
                disabled={form.formState.isSubmitting}
              >
                Create{" "}
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

export default CreateTournamentModal;
