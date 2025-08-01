"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import apiService from "@/services/api-service";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";
import { Rotate3D } from "lucide-react";

const FormSchema = z.object({
  phone: z.string().min(6, {
    message: "Enter valid phone number.",
  }),
});

const RequestPasswordForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
    },
  });

  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await apiService.post(
      JSON.stringify({ action: "changepass", username: data.phone })
    );

    console.log(res);
    if (res.error === "0") {
      router.push("/auth/login");
    } else {
      toast({ description: `${res.message}`, variant: "destructive" });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="phone"
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

        <Button type="submit" disabled={form.formState.isSubmitting}>
          Submit{" "}
          {form.formState.isSubmitting && <Rotate3D className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};

export default RequestPasswordForm;
