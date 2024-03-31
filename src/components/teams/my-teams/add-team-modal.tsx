"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/hooks/use-axios-auth";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const TEAMTYPES = ["Rugby", "Football"] as const;

const teamSchema = z.object({
  team_name: z.string().min(3, { message: "Team name is required" }),
  team_type: z.enum(TEAMTYPES),
  description: z.string(),
});

const AddTeamModal = () => {
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof teamSchema>>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      team_name: "",
      team_type: "Rugby",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof teamSchema>) => {
    const team = {
      team: {
        team_name: data.team_name,
        team_type: data.team_type,
        description: data.description,
      },
      position: "",
    };

    try {
      const res = await axiosAuth.post("/api/register_team/", team);

      if (res.status === 201) {
        toast({ description: "Created" });
        setOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onOpenChange = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Add team</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new team</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="team_name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Kenya united" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="team_type"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Rugby" />
                    </SelectTrigger>
                    <SelectContent>
                      {TEAMTYPES.map((type, idx) => (
                        <SelectItem key={idx} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Senior team" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="p-0 pt-3">
              <DialogClose asChild>
                <Button
                  type="submit"
                  onClick={form.handleSubmit(onSubmit)}
                  className="w-full"
                >
                  Create
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeamModal;
