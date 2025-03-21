"use client";

import { z } from "zod";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createFixtureEvent } from "@/actions/php-actions";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  homeP: Lineup[];
  awayP: Lineup[];
  fixType: string;
  refEvents: RefEvent[];
};

export const eventsSchema = z.object({
  event: z
    .string()
    .min(1, { message: "Home team is required" })
    .max(4, { message: "Home team is required" }),
  subEvent: z.string(),
  team: z
    .string()
    .min(1, { message: "Matchday is required" })
    .max(6, { message: "Home team is required" }),
  player: z.string(),
  subPlayer: z.string(),
  minute: z
    .string()
    .min(1, { message: "Matchday is required" })
    .max(4, { message: "Home team is required" }),
});

const AddFixtureData = ({ homeP, awayP, fixType, refEvents }: Props) => {
  const { store } = useStore((state) => state);
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(eventsSchema),
    defaultValues: {
      event: "",
      subEvent: "",
      team: "",
      player: "",
      subPlayer: "",
      minute: "",
    },
  });

  const subIds = ["17", "52"];

  const selectedId = form.watch("event");
  const selectedSubId = form.watch("subEvent");
  const selectedEvent = refEvents.find((e) => e.id === selectedId);
  const subEvents = selectedEvent?.subevent;

  const showSub = subIds.includes(selectedId);

  const { team1_name, team1_id, team2_name, team2_id } = store.refFix;
  const teams = [
    { team: team1_name, id: team1_id },
    { team: team2_name, id: team2_id },
  ];

  const selectedTeamId = form.watch("team");
  const home = teams[0].id === selectedTeamId ? "true" : "false";
  const players = home === "true" ? homeP : awayP;
  const first11 = players.filter((player) => player.player_type === "first11");
  const subs = players.filter((player) => player.player_type === "sub");

  const mutation = useMutation({
    mutationFn: createFixtureEvent,
    onSuccess(data) {
      console.log(data);
      if (data.error === "0") {
        setOpen(false);
        form.reset();
        router.refresh();
        queryClient.invalidateQueries({ queryKey: ["refFixEvents"] });
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

  const onSubmit = (value: z.infer<typeof eventsSchema>) => {
    const data = {
      action: "createrefevent",
      fixture: store.refFix.id,
      event: value.event,
      subevent: value.subEvent || 0,
      fixtype: fixType,
      team: value.team,
      player: value.player || 0,
      subplayer: value.subPlayer || 0,
      minute: value.minute,
    };

    setOpen(true);

    mutation.mutate(data);
    console.log(data);
  };

  const onOpenChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  // console.log(first11);

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogTrigger asChild>
        <Button>Populate</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add match event</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="event"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="select event" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {refEvents?.map((item) => (
                        <SelectItem value={item.id} key={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {subEvents && subEvents?.length > 0 && (
              <FormField
                control={form.control}
                name="subEvent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub event</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="select subevent" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {subEvents?.map((sub) => (
                          <SelectItem key={sub.id} value={sub.id}>
                            {sub.Name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="team"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="select team" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.team}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedSubId !== "200" && (
              <FormField
                control={form.control}
                name="player"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Player</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="select player" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {first11.map((player) => (
                          <SelectItem
                            key={player.player_id}
                            value={player.player_id}
                          >
                            {player.pname} - {player.Jersey_No}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            )}

            {showSub && (
              <FormField
                control={form.control}
                name="subPlayer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub Player</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="select player" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {subs.map((player) => (
                          <SelectItem
                            key={player.player_id}
                            value={player.player_id}
                          >
                            {player.pname} - {player.Jersey_No}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="minute"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minute</FormLabel>

                  <FormControl>
                    <Input placeholder="39" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>

          <DialogFooter className="mt-2">
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              disabled={mutation.isPending}
            >
              Populate{" "}
              {mutation.isPending && (
                <RotateCcw className="w-4 h-4 animate-spin" />
              )}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFixtureData;
