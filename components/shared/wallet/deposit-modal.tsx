import { Plus, RotateCw } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useStore } from "@/store/store";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { depositCash } from "@/actions/wallet-actions";
import { useToast } from "@/hooks/use-toast";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const depositSchema = z.object({
  phone: z.string().min(10, { message: "Please enter valid phone number" }),
  amount: z.string().min(1, { message: "Deposit amount is required" }),
});

const DepositModal = ({ open, setOpen }: Props) => {
  const { store } = useStore((state) => state);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof depositSchema>>({
    resolver: zodResolver(depositSchema),
    defaultValues: { phone: store.user.phone || "", amount: "" },
  });

  const onSubmit = async (values: z.infer<typeof depositSchema>) => {
    const deposit = {
      phone: values.phone,
      reference: store.user.account,
      damount: values.amount,
    };

    try {
      const res = await depositCash(deposit);

      if (res.ResponseCode === "0") {
        setOpen(false);
        toast({
          title: "Success",
          description:
            "Deposit request successful. Please enter your mpesa pin when prompted.",
        });
      } else {
        toast({
          title: "Success",
          description: res.ResponseDescription,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Success",
        description: "An Error occured while initiating a deposit",
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
          <Plus className="w-4 h-4" /> Deposit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deposit</DialogTitle>
          <DialogDescription>
            Enter amount in ksh to deposit to your account.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number:</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              Deposit
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

export default DepositModal;
