import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, RotateCcw } from "lucide-react";

import { Button } from "../ui/button";
import { useStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { updateFixOfficial } from "@/actions/php-actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { z } from "zod";

type AddProps = {
  fixId: string;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const officialSchema = z.object({
  refree: z.string().min(1, { message: "Provide center refree" }),
  assRefree1: z.string().min(1, { message: "Provide assistant refree 1" }),
  assRefree2: z.string().min(1, { message: "Provide assistant refree 2" }),
  reserve: z.string().min(1, { message: "Provide reserve refree" }),
});

const AddFixtureOfficialModal = ({ fixId, open, setOpen }: AddProps) => {
  const { toast } = useToast();
  //   const [open, setOpen] = useState(false);
  const { user } = useStore((state) => state);

  const form = useForm<z.infer<typeof officialSchema>>({
    resolver: zodResolver(officialSchema),
    defaultValues: {
      refree: "",
      assRefree1: "",
      assRefree2: "",
      reserve: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof officialSchema>) => {
    const refs = {
      fixture: fixId,
      ref1: values.refree,
      ref2: values.assRefree1,
      ref3: values.assRefree2,
      ref4: values.reserve,
    };

    const res = await updateFixOfficial(refs);

    if (res.error === "0") {
      setOpen(false);
      // queryClient.invalidateQueries({ queryKey: ["allPlayers"] });
      toast({ title: "Succes", description: res.message });
    } else {
      toast({
        title: "Error!",
        variant: "destructive",
        description: res.message,
      });
    }
  };

  const onOpenChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogTrigger asChild className="hidden">
        <Button size="icon" variant="outline">
          <PlusCircle className="w-4 h-4" color="#25f609" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Update Fixture</DialogTitle>
        <DialogDescription>
          You are about to add Match Officials
        </DialogDescription>

        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="refree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Center Refree</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            user.officials
                              ? `${user.officials[0].first_name}
                              ${user.officials[0].last_name}`
                              : "No teams"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {user?.officials.map((official) => (
                        <SelectItem key={official.id} value={official.id}>
                          {official.first_name} {official.last_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assRefree1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assistant refree 1</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            user.officials
                              ? `${user.officials[0].first_name}
                              ${user.officials[0].last_name}`
                              : "No teams"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {user?.officials.map((official) => (
                        <SelectItem key={official.id} value={official.id}>
                          {official.first_name} {official.last_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assRefree2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assistant refree 2</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            user.officials
                              ? `${user.officials[0].first_name}
                              ${user.officials[0].last_name}`
                              : "No teams"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {user?.officials.map((official) => (
                        <SelectItem key={official.id} value={official.id}>
                          {official.first_name} {official.last_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reserve"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reserve refree</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            user.officials
                              ? `${user.officials[0].first_name}
                              ${user.officials[0].last_name}`
                              : "No teams"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {user?.officials.map((official) => (
                        <SelectItem key={official.id} value={official.id}>
                          {official.first_name} {official.last_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="p-0">
              <Button
                className="w-full"
                onClick={form.handleSubmit(onSubmit)}
                disabled={form.formState.isSubmitting}
              >
                Add Officials{" "}
                {form.formState.isSubmitting && (
                  <RotateCcw className="ml-2 h-4 w-4 animate-spin" />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFixtureOfficialModal;
