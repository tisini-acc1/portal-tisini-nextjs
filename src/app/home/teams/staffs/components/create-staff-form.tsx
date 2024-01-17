"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/hooks/use-axios-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const staffSchema = z.object({
  username: z.string().min(3, { message: "Enter a valid username" }),
  email: z.string().min(3, { message: "Enter a valid email" }),
  phoneNo: z.string().min(3, { message: "Enter a valid phone number" }),
  firstName: z.string().min(3, { message: "Enter a valid firstname" }),
  lastName: z.string().min(3, { message: "Enter a valid lastname" }),
  position: z.string().min(3, { message: "Enter a valid position" }),
});

const CreateStaffForm = ({ teamId }: { teamId: string }) => {
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof staffSchema>>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      username: "",
      email: "",
      phoneNo: "",
      firstName: "",
      lastName: "",
      position: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof staffSchema>) => {
    const staff = {
      staff: {
        user: {
          username: data.username,
          email: data.email,
          phone_number: data.phoneNo,
          first_name: data.firstName,
          last_name: data.lastName,
          password: "manager",
          is_tisini_staff: false,
          is_competition_owner: false,
          is_team_staff: true,
          is_player: false,
          is_referee: false,
          is_agent: false,
        },
        middle_name: "",
      },
      position: data.position,
    };

    try {
      const res = await axiosAuth.post(`/users/teams/${teamId}/staffs/`, staff);

      console.log(res);
      toast({ title: "Success", description: "Staff created" });
      router.push(`/home/teams/staffs/${teamId}`);
    } catch (err: any) {
      console.log(err.response);
      if (!err.response) {
        toast({
          variant: "destructive",
          description: "No response! try again",
        });
      } else if (err.response) {
        if (err.response.status === 500) {
          toast({
            description: err.response.statusText,
            variant: "destructive",
          });
        }
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-3">
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>lastName</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Johnte" {...field} />
                </FormControl>
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
                  <Input type="text" placeholder="team manager" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="doe@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="phoneNo"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="text" placeholder="0700000000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
};

export default CreateStaffForm;
