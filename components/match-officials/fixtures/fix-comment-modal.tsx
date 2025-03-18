import { createFixtureComments } from "@/actions/php-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/lib/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

type CommentProps = {
  wCond: Condition[];
  pCond: Condition[];
};

const commentSchema = z.object({
  weather: z.string().min(1, { message: "weather is required" }),
  pitch: z.string().min(1, { message: "pitch is required" }),
  comment: z.string().min(1, { message: "comment is required" }),
});

const FixCommentModal = ({ wCond, pCond }: CommentProps) => {
  const { store } = useStore((state) => state);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: { weather: "", pitch: "", comment: "" },
  });

  const mutation = useMutation({
    mutationFn: createFixtureComments,
    onSuccess(data) {
      console.log(data);
      if (data.error === "0") {
        // setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["fixConditions"] });
        toast({ title: "Success", description: data.message });
      } else if (data.error === "1") {
        toast({
          title: "Error!",
          variant: "destructive",
          description: data.message,
        });
      }
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "Error!",
        variant: "destructive",
        description: "An error occured while creating fixtures",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof commentSchema>) => {
    const data = {
      fixture: store.refFix.id,
      weather_type: values.weather,
      commisioner_comment: values.comment,
      pitchcondition: values.pitch,
    };

    console.log(values);
    mutation.mutate(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>Comment</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Populate Match Details and Comment</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="weather"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weather</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="select weather condition" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {wCond?.map((item) => (
                        <SelectItem value={item.id} key={item.id}>
                          {item.name}
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
              name="pitch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pitch</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="select pitch condition" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {pCond?.map((item) => (
                        <SelectItem value={item.id} key={item.id}>
                          {item.name}
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
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about the match"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button>Comment</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FixCommentModal;
