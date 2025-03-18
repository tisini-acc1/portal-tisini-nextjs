"use client";

import { useForm } from "react-hook-form";

import { useStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

const FixPaymentModal = ({ fixture }: PayProps) => {
  const { store } = useStore((state) => state);

  const form = useForm({
    defaultValues: {
      phone: store.user.phone || "",
    },
  });

  const onSubmit = () => {
    console.log("first");
  };

  return (
    <Dialog>
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
            <FormField
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
            />

            <DialogFooter>
              <Button size={"sm"}>Deposit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FixPaymentModal;
