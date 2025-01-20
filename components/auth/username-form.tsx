"use client";

import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import { RotateCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { useStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { handleLogin } from "@/actions/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be above 3 characters" }),
  password: z.string().min(4, { message: "Please provide a valid password" }),
});

const UsernameForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useStore((state) => state);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const user = {
      loginnisave: "login",
      username: data.username,
      password: data.password,
      // usertype: "Agent",
    };

    setIsLoading(true);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}`, user);
      // console.log(res);
      if (res.data.success === "1") {
        const redirectUrl = await handleLogin(
          res.data.userid,
          res.data.userKey,
          res.data.role
        );

        updateUser(
          res.data.name,
          res.data.userid,
          res.data.role,
          res.data.phone
        );

        router.replace(redirectUrl);
      } else {
        if (res.data.error) {
          if (res.data.error === "invalidverification") {
            router.replace("/auth/verify");
          }

          toast({
            title: "Error",
            description: res.data.message,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Unable to sign-in, check your internet connection.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number:</FormLabel>
              <FormControl>
                <Input type="text" placeholder="0700000000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password:</FormLabel>
              <FormControl>
                <Input type="password" placeholder="your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full items-center"
          disabled={form.formState.isSubmitting}
        >
          Login
          {(form.formState.isSubmitting || isLoading) && (
            <RotateCw className="ml-2 w-4 h-4 animate-spin" />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default UsernameForm;
