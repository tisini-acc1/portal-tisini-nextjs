"use client";

import { z } from "zod";
import { RotateCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "@/lib/axios";
import { regSchema } from "./auth-schema";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type inputType = z.infer<typeof regSchema>;

const RegisterForm = ({ role }: { role: string }) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<inputType>({
    resolver: zodResolver(regSchema),
    defaultValues: {
      username: "",
      email: "",
      phone_number: "",
      first_name: "",
      last_name: "",
      password: "",
      cfmPassword: "",
    },
  });

  const userRole = {
    is_tisini_staff: false,
    is_competition_owner: false,
    is_team_staff: false,
    is_player: false,
    is_referee: false,
    is_agent: false,
  };

  if (role === "team-owner") {
    userRole.is_team_staff = true;
  } else if (role === "player") {
    userRole.is_player = true;
  } else if (role === "tournament-owner") {
    userRole.is_competition_owner = true;
  } else if (role === "referee") {
    userRole.is_referee = true;
  } else if (role === "agent") {
    userRole.is_agent = true;
  }

  const onSubmit = async (data: inputType) => {
    const { cfmPassword, ...user } = data;
    const newUser = { ...user, ...userRole };
    // console.log(newUser);

    try {
      const res = await axios.post("/auth/register/", newUser);

      if (res.status === 201) {
        router.push("/auth/login");
        // console.log(res);
      }
    } catch (error: any) {
      // console.log(error?.message);
      if (!error.response) {
        toast({ description: `${error?.message}`, variant: "destructive" });
      } else if (error.response.data) {
        if (error.response.status === 400) {
          for (let value of Object.values(
            error.response.data
          ) as Array<string>) {
            toast({ description: `${value[0]}`, variant: "destructive" });
            // console.log(value[0]);
          }
        } else {
          toast({
            description: `Error: ${error.response.status}`,
            variant: "destructive",
          });
        }
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firstname:</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="john" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lastname:</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username:</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="jonte" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number:</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="0700000000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input type="email" placeholder="doe@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 flex-col md:flex-row">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cfmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password:</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full items-center"
          disabled={form.formState.isSubmitting}
        >
          Register
          {form.formState.isSubmitting && (
            <RotateCw className="ml-2 w-4 h-4 animate-spin" />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
