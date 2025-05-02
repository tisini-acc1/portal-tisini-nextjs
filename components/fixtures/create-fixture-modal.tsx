"use client";

import { z } from "zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Plus, RotateCcw } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useStore } from "@/store/store";
import { Calendar } from "../ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { createFixture } from "@/actions/php-actions";
import { getTournamentTeams } from "@/actions/django-actions";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const fixtureSchema = z.object({
  home: z.string().min(1, { message: "Home team is required" }),
  away: z.string().min(1, { message: "Away team is required" }),
  matchday: z.string().min(1, { message: "Matchday is required" }),
  gameTime: z.string({ message: "Match Time type is required" }),
  gameDate: z.date({
    required_error: "Match date is required.",
  }),
  // teamStats: z.boolean().default(false),
});

const CreateFixtureModal = () => {
  const [team, setTeam] = useState<CompTeam>({} as CompTeam);

  const { store } = useStore((state) => state);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["teams", store.tournament, store.serie],
    queryFn: () => getTournamentTeams(store.tournament, store.serie),
  });

  const form = useForm<z.infer<typeof fixtureSchema>>({
    resolver: zodResolver(fixtureSchema),
    defaultValues: {
      home: team.id,
      away: team.id,
      gameDate: new Date(),
      gameTime: "",
      matchday: "",
      // teamStats: false,
    },
  });

  useEffect(() => {
    if (data) {
      setTeam(data[0]);
    }
  }, [data]);

  // useEffect(() => {
  //   if (form.formState.errors) {
  //     console.log("Validation errors:", form.formState.errors);
  //   }
  // }, [form.formState.errors]);

  const mutation = useMutation({
    mutationFn: createFixture,
    onSuccess(data) {
      if (data.error === "0") {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["fixtures"] });
        toast({ title: "Success", description: data.message });
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
        description: "An error occured while creating fixtures",
      });
    },
  });

  async function onSubmit(values: z.infer<typeof fixtureSchema>) {
    const date = format(values.gameDate, "yyyy-M-d");
    const fixture = {
      action: "createfix",
      team1: values.home,
      team2: values.away,
      gamedate: date,
      tournamentid: store.tournament,
      matchday: values.matchday,
      fixturetype: store.fixType,
      live: "0",
      teamview: "0",
      series: store.serie,
      hybrid: "0",
      category: "1",
      group: "1",
      gametime: values.gameTime,
      pitch: "1",
      playeradd: "0",
    };

    mutation.mutate(fixture);
  }

  const onOpenChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 w-5 h-5" /> Fixture
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Fixture</DialogTitle>
          <DialogDescription>
            You are about to create a new fixture.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="home"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Home Team</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={data ? team.name : "No teams"}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data?.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
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
              name="away"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Away Team</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={data ? team.name : "No teams"}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data?.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
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
              name="matchday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matchday</FormLabel>
                  <FormControl>
                    <Input placeholder="4" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="gameTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fixture Time</FormLabel>
                    <FormControl>
                      <Input placeholder="15:00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gameDate"
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
                          // disabled={(date) =>
                          //   date > new Date() || date < new Date("1900-01-01")
                          // }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* <FormField
              control={form.control}
              name="teamStats"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Team Stats</FormLabel>
                  </div>
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

export default CreateFixtureModal;
