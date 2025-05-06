import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
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
import { RotateCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { useStore } from "@/store/store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ModifyFixture } from "@/actions/php-actions";
import { useToast } from "@/hooks/use-toast";

type UpdateProps = {
  fixture: AgentFixture;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const statusSchema = z.object({
  home_score: z.string().min(1, "Home score is required"),
  away_score: z.string().min(1, "Away score is required"),
  matchplay_status: z.string().min(1, "Match status is required"),
});

const UpdateScoresModal = ({ fixture, open, setOpen }: UpdateProps) => {
  const matchPlayStatus = useStore((state) => state.store.matchStatus);
  const serie = useStore((state) => state.store.serie);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(statusSchema),
    defaultValues: { home_score: "", away_score: "", matchplay_status: "2" },
  });

  const mutation = useMutation({
    mutationFn: ModifyFixture,
    onSuccess: (data) => {
      // console.log(data);
      if (data.error === "0") {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["fixtures", serie] });
        toast({ title: "Success", description: data.message });
        form.reset();
      } else {
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

  const onSubmit = async (values: z.infer<typeof statusSchema>) => {
    const fixData = {
      gamedate: fixture.game_date,
      fieldid: fixture.field_id,
      gamestatus: fixture.game_status,
      homescore: values.home_score,
      awayscore: values.away_score,
      matchday: fixture.matchday,
      matchtime: fixture.matchtime,
      commcomments: fixture.commisioner_comment,
      othercomments: fixture.other_comment,
      playstatus: values.matchplay_status,
      videoURL: fixture.videourl,
      vfixid: fixture.videofixtid,
      fixture: fixture.fixture,
    };

    // console.log(fixData);
    mutation.mutate(fixData);
  };

  const onOpenChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogTrigger asChild>
        <Button className="hidden">Update Scores</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Fixture Score</DialogTitle>
          <DialogDescription>hghgh</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="home_score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Home Score</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="away_score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Away Score</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="matchplay_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Match Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={"match status"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {matchPlayStatus.map((status) => (
                        <SelectItem key={status.id} value={status.id}>
                          {status.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="p-0">
              <Button
                className="w-full"
                onClick={form.handleSubmit(onSubmit)}
                disabled={form.formState.isSubmitting}
              >
                Update Scores{" "}
                {form.formState.isSubmitting && (
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

export default UpdateScoresModal;
