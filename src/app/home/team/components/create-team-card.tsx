"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAxiosAuth from "@/lib/hooks/use-axios-auth";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TEAMTYPES = ["Rugby", "Football"] as const;

const teamSchema = z.object({
  team_name: z.string().min(3, { message: "Team name is required" }),
  team_type: z.enum(TEAMTYPES),
  position: z.string().min(3, "Position is required").max(50),
  description: z.string(),
});

const CreateTeamCard = () => {
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof teamSchema>>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      team_name: "",
      team_type: "Rugby",
      position: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof teamSchema>) => {
    const team = {
      team: {
        team_name: data.team_name,
        team_type: data.team_type,
        description: data.description,
        parent: null,
      },
      position: data.description,
    };

    try {
      const res = await axiosAuth.post("/users/register_team/", team);

      if (res.status === 201) {
        toast({ description: "Created" });
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Start by creating your team</CardTitle>
      </CardHeader>

      <CardContent>
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
              name="position"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="director, tm, coach ..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Your position in the team</FormDescription>
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

            <CardFooter className="p-0 pt-3">
              <Button
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
                className="w-full"
              >
                Create
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateTeamCard;
