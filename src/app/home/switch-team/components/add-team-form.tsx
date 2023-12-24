"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const TEAMTYPES = ["Rugby", "Football"] as const;

const teamSchema = z.object({
  teamName: z.string().min(3, { message: "Team name is required" }),
  teamType: z.enum(TEAMTYPES),
  description: z.string(),
});

const AddTeamForm = () => {
  const form = useForm<z.infer<typeof teamSchema>>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      teamName: "",
      teamType: "Rugby",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof teamSchema>) => {
    console.log(data);
  };

  return (
    <Card className="mt-4 max-w-md mx-auto">
      <CardContent className="mt-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="teamName"
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
              name="teamType"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Type</FormLabel>
                  <Select>
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

export default AddTeamForm;
