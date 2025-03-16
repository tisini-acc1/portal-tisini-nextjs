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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const AddFixtureData = ({ open, setOpen }: Props) => {
  const form = useForm({
    defaultValues: {
      event: "",
      subEvent: "",
      team: "",
      player: "",
      subPlayer: "",
      minute: "",
    },
  });

  const onOpenChangeWrapper = (value: boolean) => {
    setOpen(value);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogTrigger asChild>
        <Button className="hidden">Populate</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Populate another event</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form action="" className="space-y-6">
            <FormField
              control={form.control}
              name="event"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Goal" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="1">Freekick</SelectItem>
                      <SelectItem value="2">Penalty</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subEvent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub event</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="open play" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="3">open play</SelectItem>
                      <SelectItem value="4">freekick</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="team"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Kenya United" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="1">Gor Mahia</SelectItem>
                      <SelectItem value="2">AFC Leopards</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="player"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Player</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="John Doe" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="3">Truthful Man</SelectItem>
                          <SelectItem value="4">Mwenge Mutuse</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="subPlayer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sub Player</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Jane Doe" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="3">Truthful Man</SelectItem>
                          <SelectItem value="4">Mwenge Mutuse</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="minute"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minute</FormLabel>

                  <FormControl>
                    <Input placeholder="39" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>

          <DialogFooter className="mt-2">
            <Button>Populate</Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFixtureData;
