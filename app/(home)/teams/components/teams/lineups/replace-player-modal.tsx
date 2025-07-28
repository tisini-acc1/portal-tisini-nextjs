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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { replaceLineupPlayers } from "@/actions/php-actions";
import { RotateCwIcon } from "lucide-react";

type ReplaceProps = {
  allPlayers: TeamPlayer[];
  lineups: Lineup[];
};

const ReplacePlayerModal = ({ allPlayers, lineups }: ReplaceProps) => {
  const [open, setOpen] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      player: "",
      replaceWith: "",
    },
  });

  const mutation = useMutation({
    mutationFn: replaceLineupPlayers,
    onSuccess: (data) => {
      console.log(data);
      if (data.error === "0") {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["teamLineups"] });
        toast({ title: "Success", description: data.message });
      } else {
        // setIsUploading(false);
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
        description: "An error occured while creating player",
      });
    },
  });

  const onSubmit = (values: { player: string; replaceWith: string }) => {
    const player = lineups.find((player) => player.player_id === values.player);

    const data = {
      playernewid: values.replaceWith,
      playertype: player?.player_type as string,
      fixture: lineups[0].fixture_id,
      playerid: values.player,
    };

    mutation.mutate(data);
  };

  const onOpenChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  const unusedPlayers = allPlayers.filter(
    (player) =>
      !lineups.some((remaining) => remaining.player_id === player.player_id)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
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
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={mutation.isPending}
          >
            Replace{" "}
            {mutation.isPending && <RotateCwIcon className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReplacePlayerModal;
