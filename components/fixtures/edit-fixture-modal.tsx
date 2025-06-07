import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { CalendarIcon, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import { useStore } from "@/store/store";
import { useToast } from "@/hooks/use-toast";
import { getTournamentTeams, updateFixture } from "@/actions/php-actions";
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
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const fixtureSchema = z.object({
  home: z.string().min(1, { message: "Home team is required" }),
  away: z.string().min(1, { message: "Away team is required" }),
  matchday: z.string().min(1, { message: "Matchday is required" }),
  gameTime: z.string({ message: "Match Time type is required" }),
  category: z.string(),
  group: z.string(),
  gameDate: z.date({
    required_error: "Match date is required.",
  }),
  // teamStats: z.boolean().default(false),
});

type EditProps = {
  fixture: AgentFixture;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const EditFixtureModal = ({ fixture, open, setOpen }: EditProps) => {
  const { toast } = useToast();
  const { store } = useStore((state) => state);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["teams", store.tournament, store.serie],
    queryFn: () => getTournamentTeams(store.serie),
  });

  const form = useForm<z.infer<typeof fixtureSchema>>({
    resolver: zodResolver(fixtureSchema),
    defaultValues: {
      home: fixture.team1_id,
      away: fixture.team2_id,
      gameDate: new Date(fixture.game_date),
      gameTime: fixture.matchtime,
      matchday: fixture.matchday,
      category: "",
      group: "",
      // teamStats: false,
    },
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: updateFixture,
    onSuccess(data) {
      console.log(data);
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
    const fixData = {
      team1: values.home,
      team2: values.away,
      gamedate: date,
      matchday: values.matchday,
      matchtime: values.gameTime,
      fixtureid: fixture.fixture,
    };

    // console.log(fixData);
    mutation.mutate(fixData);
  }

  const onOpenChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  if (isLoading) {
    return <div className="hidden">Loading...</div>;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogTrigger asChild className="hidden">
        <Button size="sm">
          <Plus className="mr-2 w-5 h-5" /> Fixture
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Fixture</DialogTitle>
          <DialogDescription>
            You are about to update fixture details.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {!isLoading && (
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
                          <SelectValue placeholder={"Select team"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data?.map((team) => (
                          <SelectItem key={team.teamid} value={team.teamid}>
                            {team.teamname}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {!isLoading && (
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
                          <SelectValue placeholder={"Select team"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data?.map((team) => (
                          <SelectItem key={team.teamid} value={team.teamid}>
                            {team.teamname}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

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

            {/* <div className="grid grid-cols-2 gap-2">
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
                          <SelectValue
                            placeholder={data ? team.teamname : "No categories"}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tournament.season[0].category?.map((category) => (
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={data ? team.teamname : "No categories"}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {category[0]?.group?.map((group) => (
                          <SelectItem key={group.id} value={group.id}>
                            {group.groupname}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}

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
                Update{" "}
                {/* {mutation.isPending && (
                  <RotateCcw className="ml-2 h-4 w-4 animate-spin" />
                )} */}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditFixtureModal;
