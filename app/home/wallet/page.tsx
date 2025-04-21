"use client";

import { z } from "zod";
import { RotateCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getBalance } from "@/actions/wallet-actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";

const walletSchema = z.object({
  password: z.string().min(4, { message: "Please provide a valid password" }),
});

const ValidateWalletPage = () => {
  const { store, updateBalance } = useStore((state) => state);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof walletSchema>>({
    resolver: zodResolver(walletSchema),
    defaultValues: { password: "" },
  });

  const onSubmit = async (values: z.infer<typeof walletSchema>) => {
    const user = {
      username: store.user.phone,
      password: values.password,
    };

    try {
      const res = await getBalance(user);

      if (res.code === "1") {
        updateBalance(res.amount);
        toast({ title: "Success", description: res.message });
        router.push("/home/wallet/balance");
      } else if (res.code === "0") {
        toast({
          title: "Success",
          description: res.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Success",
        description: "An Error occured while fetching balance",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-wallet bg-cover bg-center bg-no-repeat rounded-lg">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Validate</CardTitle>
          <CardDescription>
            Enter your wallet password before proceeding.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

              <Button
                type="submit"
                className="w-full items-center"
                disabled={form.formState.isSubmitting}
              >
                Validate
                {form.formState.isSubmitting && (
                  <RotateCw className="ml-2 w-4 h-4 animate-spin" />
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default ValidateWalletPage;
