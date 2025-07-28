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
import { swapLineupPlayers } from "@/actions/php-actions";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { RotateCcwIcon } from "lucide-react";

type SwapProps = {
  lineups: Lineup[];
};

const SwapPlayerModal = ({ lineups }: SwapProps) => {
  const [open, setOpen] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      player: "",
      swapWith: "",
    },
  });

  const mutation = useMutation({
    mutationFn: swapLineupPlayers,
    onSuccess: (data) => {
      // console.log(data);
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

  const onSubmit = (values: { player: string; swapWith: string }) => {
    const data = {
      player: values.player,
      swapPlayerId: values.swapWith,
      fixtureid: lineups[0].fixture_id,
    };

    mutation.mutate(data);
  };

  const onOpenChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  const starting = lineups.filter((player) => player.player_type === "first11");
  const subs = lineups.filter((player) => player.player_type === "sub");

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogTrigger asChild>
        <Button size={"sm"}>Swap</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Swap players</DialogTitle>
          <DialogDescription>
            You are about to swap a player from the starting lineup and replace
            him/her with another player from the substitutes list.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="player"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Player</FormLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="select player to swap" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {starting.map((player) => (
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
              name="swapWith"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Swap with</FormLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="select a player" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {subs.map((player) => (
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
          </form>
        </Form>

        <DialogFooter className="mt-4">
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={mutation.isPending}
          >
            Replace{" "}
            {mutation.isPending && <RotateCcwIcon className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SwapPlayerModal;
