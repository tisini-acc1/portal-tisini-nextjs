"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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

type ReplaceProps = {
  allPlayers: TeamPlayer[];
  lineups: Lineup[];
};

const ReplacePlayerModal = ({ allPlayers, lineups }: ReplaceProps) => {
  const form = useForm({
    defaultValues: {
      player: "",
      replaceWith: "",
    },
  });

  const onSubmit = () => {
    console.log("first");
  };

  const unusedPlayers = allPlayers.filter(
    (player) =>
      !lineups.some((remaining) => remaining.player_id === player.player_id)
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>Replace</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Replace player</DialogTitle>
          <DialogDescription>
            You are about to remove a player from the squad list and replace
            him/her with another player.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="player"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Player</FormLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="select player to replace" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {lineups.map((player) => (
                        <SelectItem key={player.id} value={player.player_id}>
                          {player.pname} {player.Jersey_No}
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
              name="replaceWith"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Replace with</FormLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="select a player" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {unusedPlayers.map((player) => (
                        <SelectItem key={player.id} value={player.player_id}>
                          {player.pname} {player.current_jersey_no}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter className="mt-4">
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Replace
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReplacePlayerModal;
