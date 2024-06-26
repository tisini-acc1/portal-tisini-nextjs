"use client";

import { z } from "zod";
import { useState } from "react";
import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/hooks/use-axios-auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
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

const staffSchema = z.object({
  username: z.string().min(3, { message: "Enter a valid username" }),
  email: z.string().min(3, { message: "Enter a valid email" }),
  phoneNo: z.string().min(3, { message: "Enter a valid phone number" }),
  firstName: z.string().min(3, { message: "Enter a valid firstname" }),
  lastName: z.string().min(3, { message: "Enter a valid lastname" }),
  position: z.string().min(3, { message: "Enter a valid position" }),
  team: z.string().min(3, { message: "Please select a team" }),
});

const CreateStaffModal = ({ team }: { team: Team }) => {
  const [open, setOpen] = useState(false);
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
      team: "",
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
      const res = await axiosAuth.post(
        `/api/teams/${data.team}/staffs/`,
        staff
      );

      if (res.status === 201) {
        console.log(res);
        toast({ title: "Success", description: "Staff created" });
        router.refresh();
      }
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

  const openChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={openChangeWrapper}>
      <DialogTrigger asChild>
        <Button size="sm">
          <UserPlus className="mr-2 w-4 h-4" />
          staff
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            Add team staff to {team.team_name}
          </DialogDescription>
        </DialogHeader>

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
                      <Input
                        type="text"
                        placeholder="team manager"
                        {...field}
                      />
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
                    <Input
                      type="email"
                      placeholder="doe@gmail.com"
                      {...field}
                    />
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
      </DialogContent>
    </Dialog>
  );
};

export default CreateStaffModal;
