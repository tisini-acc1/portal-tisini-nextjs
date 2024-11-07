"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/hooks/use-axios-auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  teams: Team[];
  compId: string;
};

const teamSchema = z.object({
  team: z.string().min(3, "Please select team"),
});

type inputType = z.infer<typeof teamSchema>;

const SelectTeamForm = ({ teams, compId }: Props) => {
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<inputType>({
    defaultValues: {
      team: teams[0]?.id,
    },
  });

  const onSubmit = (data: inputType) => {
    axiosAuth
      .post(`/users/competitions/${compId}/teams/`, data)
      .then(function (res) {
        if (res.status === 201) {
          toast({
            title: "success",
            description: "Team registered successfully",
          });
          router.push("/home/admin-area/competitions");
        }
      })
      .catch(function (err) {
        console.log(err);
      })
      .finally(function () {
        router.refresh();
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="team"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="select team" />
                </SelectTrigger>

                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.team_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-4">
          Register
        </Button>
      </form>
    </Form>
  );
};

export default SelectTeamForm;
