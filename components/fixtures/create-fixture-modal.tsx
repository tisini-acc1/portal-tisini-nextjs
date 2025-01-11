"use client";

import { CalendarIcon, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { format } from "date-fns";
import {
  Dialog,
  // DialogClose,
  DialogContent,
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
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTournamentTeams } from "@/actions/django-actions";
import { createFixture } from "@/actions/php-actions";

export const fixtureSchema = z.object({
  home: z.string().min(1, { message: "Home team is required" }),
  away: z.string().min(1, { message: "Away team is required" }),
  matchday: z.string().min(1, { message: "Matchday is required" }),
  type: z.string().min(4, { message: "Fixture type is required" }),
  gameTime: z.string({ message: "Match Time type is required" }),
  gameDate: z.date({
    required_error: "Match date is required.",
  }),
  // teamStats: z.boolean().default(false),
});

const CreateFixtureModal = () => {
  const [team, setTeam] = useState<CompTeam>({} as CompTeam);

  const { user } = useStore((state) => state);

  const { data } = useQuery({
    queryKey: ["teams", user.tournament, user.series],
    queryFn: () => getTournamentTeams(user.tournament, user.series),
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
      type: "rugby15",
    },
  });

  useEffect(() => {
    if (data) {
      setTeam(data[0]);
    }
  }, [data]);

  useEffect(() => {
    if (form.formState.errors) {
      console.log("Validation errors:", form.formState.errors);
    }
  }, [form.formState.errors]);

  async function onSubmit(values: z.infer<typeof fixtureSchema>) {
    const date = format(values.gameDate, "yyyy-M-d");
    const fixture = {
      action: "createfix",
      team1: values.home,
      team2: values.away,
      gamedate: date,
      tournamentid: user.tournament,
      matchday: values.matchday,
      fixturetype: values.type,
      live: "0",
      teamview: "0",
      series: user.series,
      hybrid: "0",
      category: "1",
      group: "1",
      gametime: values.gameTime,
      pitch: "1",
      playeradd: "0",
      // gettoken: "1cb86587c54b4736a4ec6388f32af060",
    };
    console.log(values);
    createFixture(fixture);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 w-5 h-5" /> Fixture
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Fixture</DialogTitle>
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

            <div className="flex gap-4">
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

              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fixture Type</FormLabel>
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
              </div>
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
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
              </div>

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

            <DialogFooter>
              {/* <DialogClose asChild></DialogClose> */}
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFixtureModal;
