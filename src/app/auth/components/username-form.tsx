"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { RotateCw } from "lucide-react";

const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be above 3 characters" }),
  password: z.string().min(6, { message: "Please provide a valid password" }),
});

const UsernameForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const res = await signIn("credentials", {
      username_or_email: data.username,
      password: data.password,
      redirect: false,
      // callbackUrl: props.callbackUrl || '/home'
    });

    if (res?.ok) {
      console.log(res);
      router.push("/home");
    } else if (res?.status === 401) {
      console.log(res);
      toast({
        title: "Error",
        description: "Invalid credentials provided",
        variant: "destructive",
      });
    }

    console.log(res);
    toast({
      title: "Error",
      description: "Unable to sign-in, check your internet connection.",
      variant: "destructive",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          {form.formState.isSubmitting && (
            <RotateCw className="ml-2 w-4 h-4 animate-spin" />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default UsernameForm;
