"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import apiService from "@/services/api-service";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Rotate3D } from "lucide-react";
import { toast } from "sonner";

const FormSchema = z.object({
  oldPassword: z.string().min(4).max(15),
  password: z.string().min(4).max(15),
  cfmPassword: z.string().min(4).max(15),
});

const ResetPasswordForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      oldPassword: "",
      cfmPassword: "",
    },
  });

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await apiService.post(
      JSON.stringify({
        action: "verifyAccount",
        newpassword: data.password,
        oldpassword: data.oldPassword,
        code: localStorage.getItem("code"),
      })
    );

    // console.log(res);
    if (res.error === "0") {
      router.push("/auth/login");
    } else {
      toast("Error", { description: `${res.message}` });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old Password:</FormLabel>
              <FormControl>
                <Input type="password" placeholder="your password" {...field} />
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
              <FormLabel>New Password:</FormLabel>
              <FormControl>
                <Input type="password" placeholder="your password" {...field} />
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
              <FormLabel>Confirm New Password:</FormLabel>
              <FormControl>
                <Input type="password" placeholder="your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          Submit{" "}
          {form.formState.isSubmitting && <Rotate3D className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
