"use client";

import { z } from "zod";
import { RotateCw } from "lucide-react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(15),
});

type inputType = z.infer<typeof loginSchema>;

const EmailForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<inputType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: inputType) => {
    const res = await signIn("credentials", {
      username_or_email: data.email,
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
    } else {
      console.log(res);
      toast({
        title: "Error",
        description: "Unable to sign-in, check your internet connection.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email:</FormLabel>
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

export default EmailForm;
