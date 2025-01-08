"use client";

import { z } from "zod";
import { RotateCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import { regSchema } from "./auth-schema";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/services/api-service";

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

  let userRole = 1;

  if (role === "team-owner") {
    userRole = 2;
  } else if (role === "player") {
    userRole = 5;
  } else if (role === "tournament-owner") {
    userRole = 6;
  } else if (role === "referee") {
    userRole = 9;
  } else if (role === "agent") {
    userRole = 1;
  }

  const onSubmit = async (data: inputType) => {
    const { ...user } = data;
    const newUser = {
      action: "registeruser",
      id_no: "",
      email: user.email,
      phone_number: user.phone_number,
      first_name: user.first_name,
      last_name: user.last_name,
      other_name: "",
      password: user.password,
      role: userRole,
    };
    // console.log(newUser);

    const res = await apiService.post(JSON.stringify(newUser));

    if (res.error === "0") {
      localStorage.setItem(
        "user",
        JSON.stringify({ password: user.password, username: user.phone_number })
      );
      toast({ description: `${res.message}` });
      router.push("/auth/verify");
    } else {
      toast({ description: `${res.message}`, variant: "destructive" });
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
