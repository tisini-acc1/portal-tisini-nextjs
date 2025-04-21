import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, RotateCcw } from "lucide-react";

import { Button } from "../ui/button";
import { useStore } from "@/store/store";
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

type AddProps = {
  fixId: string;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const officialSchema = z.object({
  referee: z.string().min(1, { message: "Provide center referee" }),
  assreferee1: z.string(),
  assreferee2: z.string(),
  reserve: z.string(),
});

const AddFixtureOfficialModal = ({ fixId, open, setOpen }: AddProps) => {
  const { toast } = useToast();
  //   const [open, setOpen] = useState(false);
  const { store } = useStore((state) => state);
  // console.log(store.officials);

  const form = useForm<z.infer<typeof officialSchema>>({
    resolver: zodResolver(officialSchema),
    defaultValues: {
      referee: "",
      assreferee1: "",
      assreferee2: "",
      reserve: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof officialSchema>) => {
    const refs = {
      fixture: fixId,
      ref1: values.referee,
      ref2: values.assreferee1 || 0,
      ref3: values.assreferee2 || 0,
      ref4: values.reserve || 0,
    };

    const res = await updateFixOfficial(refs);
    // console.log(res);
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

        {store.officials.length <= 0 ? (
          <div>No officials</div>
        ) : (
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="referee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Center referee</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"select referee"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {store?.officials.map((official) => (
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
                name="assreferee1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assistant referee 1</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"select offcial"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {store?.officials.map((official) => (
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
                name="assreferee2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assistant referee 2</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"select official"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {store?.officials.map((official) => (
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
                    <FormLabel>Reserve referee</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"select official"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {store?.officials.map((official) => (
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
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddFixtureOfficialModal;
