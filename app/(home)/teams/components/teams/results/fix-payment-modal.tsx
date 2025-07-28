"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RotateCwIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { useStore } from "@/store/store";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fixturePayment } from "@/actions/php-actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

type PayProps = {
  fixture: TeamFixture;
};

const paySchema = z.object({
  password: z.string().min(4, { message: "Enter a valid password" }),
});

const FixPaymentModal = ({ fixture }: PayProps) => {
  const user = useStore((state) => state.store.user);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(paySchema),
    defaultValues: {
      // phone: user.phone || "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof paySchema>) => {
    const data = {
      username: user.phone,
      password: values.password,
      amount: fixture.amount,
      reference: `fixture payment: ${fixture.team1_name} v ${fixture.team2_name}`,
      tcode: fixture.billitem,
      fixture: fixture.id,
    };

    try {
      const res = await fixturePayment(data);

      // console.log(res);
      if (res.code === "1") {
        setOpen(false);
        toast({ title: "Success", description: res.message });
        queryClient.invalidateQueries({ queryKey: ["teamTournaments"] });
      } else if (res.code === "0") {
        toast({
          title: "Error!",
          variant: "destructive",
          description: res.message,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error!",
        variant: "destructive",
        description: "An error occured while creating fixtures",
      });
    }
  };

  const onOpenChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogTrigger asChild>
        <Button size={"sm"}>pay</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pay for fixture</DialogTitle>
          <DialogDescription>
            To access the match stats, please make a payment of KSH{" "}
            {fixture.amount}. You can pay directly from your wallet or deposit
            via M-Pesa to proceed.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
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

            <DialogFooter>
              <Button size={"sm"}>
                Make payment
                {form.formState.isSubmitting && (
                  <RotateCwIcon className="animate-spin mr-1" />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FixPaymentModal;
