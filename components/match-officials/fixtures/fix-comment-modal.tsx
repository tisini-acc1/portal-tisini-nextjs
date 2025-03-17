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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

const FixCommentModal = () => {
  const form = useForm({
    defaultValues: { weather: "", pitch: "", comment: "" },
  });

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
          <form action="" className="space-y-6">
            <FormField
              control={form.control}
              name="weather"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weather</FormLabel>
                  <FormControl>
                    <Input placeholder="sunny" {...field} />
                  </FormControl>
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
                  <FormControl>
                    <Input placeholder="pathetic" {...field} />
                  </FormControl>
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
