import { Plus, RotateCw } from "lucide-react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { makeWithdraw, withdrawCost } from "@/actions/wallet-actions";
import { useStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const withdrawSchema = z.object({
  amount: z.string().min(1, { message: "Deposit amount is required" }),
});

const WithdrawalModal = ({ open, setOpen }: Props) => {
  const { store, updateBalance } = useStore((state) => state);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof withdrawSchema>>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: { amount: "" },
  });

  const onSubmit = async (values: z.infer<typeof withdrawSchema>) => {
    const data = await withdrawCost(values.amount);
    console.log(data);
    if (data.code === "1") {
      const withdraw = {
        wamount: values.amount,
        deduct: data.cost,
        account: store.user.account,
      };

      const res = await makeWithdraw(withdraw);
      console.log(withdraw);
      console.log(res);
      if (res.code === "1") {
        updateBalance(res.balance);
        setOpen(false);
        toast({ title: "Success", description: res.message });
      } else if (res.code === "0") {
        toast({
          title: "Error!",
          description: res.message,
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Success",
        description: "An Error occured",
        variant: "destructive",
      });
    }
  };

  const onOpenChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogTrigger asChild className="hidden">
        <Button size="sm">
          <Plus className="w-4 h-4" /> Withdraw
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Withdraw</DialogTitle>
          <DialogDescription>
            Enter amount in ksh to withdraw. Transaction fee applies.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount:</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="50" {...field} />
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
              Withdraw
              {form.formState.isSubmitting && (
                <RotateCw className="ml-2 w-4 h-4 animate-spin" />
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawalModal;
