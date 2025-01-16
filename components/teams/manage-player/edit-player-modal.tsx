"use client";

import { z } from "zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
// import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { RotateCcw, Edit, CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { playerSchema } from "./create-player-modal";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type EditProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
  player: TeamPlayer;
  countries: Country[];
};

const POSITIONTYPES = [
  "Goal keeper",
  "Defender",
  "Midfielder",
  "Forward",
] as const;

const EditPlayerModal = ({ open, setOpen, player, countries }: EditProps) => {
  const form = useForm<z.infer<typeof playerSchema>>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      phone: "",
      firstName: "",
      lastName: "",
      dob: new Date(),
      nationality: "",
      position: "",
      idNumber: "",
      jersey: "",
      signed: new Date(),
    },
  });

  useEffect(() => {
    if (form.formState.errors) {
      console.log("Validation errors:", form.formState.errors);
    }
  }, [form.formState.errors]);

  // const mutation = useMutation({
  //   mutationFn: createPlayer,
  //   onSuccess: (data) => {
  //     // console.log(data);
  //     if (data.error === "0") {
  //       setOpen(false);
  //       queryClient.invalidateQueries({ queryKey: ["allPlayers"] });
  //       toast({ title: "Succes", description: data.message });
  //     } else {
  //       toast({
  //         title: "Error!",
  //         variant: "destructive",
  //         description: data.message,
  //       });
  //     }
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });

  const onSubmit = async (data: z.infer<typeof playerSchema>) => {
    const player = {
      id_no: data.idNumber,
      phone_number: data.phone,
      first_name: data.firstName,
      last_name: data.lastName,
      sirname: "",
      dob: format(data.dob, "yyyy-M-d"),
      nationality: data.nationality,
      position: data.position,
      email: "",
      password: data.idNumber.slice(1, 5),
      role: "5",
      // teamid: user.team,
      Jersey: data.jersey,
      signed: format(data.signed, "yyyy-M-d"),
    };

    //   mutation.mutate(player);
  };

  const onOpenChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogTrigger asChild className="hidden">
        <Button size="sm">
          <Edit className="w-4 h-4" /> Player
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Player Details</DialogTitle>
          <DialogDescription>
            You are in the process of updating {player?.pname}.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="idNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID number or Birth Certificate number</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jersey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jersey Number</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="select type" />
                        </SelectTrigger>

                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.id} value={country.id}>
                              {country.en_short_name}
                            </SelectItem>
                          ))}
                        </SelectContent>

                        <FormMessage />
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="select type" />
                        </SelectTrigger>

                        <SelectContent>
                          {POSITIONTYPES.map((type, idx) => (
                            <SelectItem key={idx} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>

                        <FormMessage />
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="mb-3">Date of Birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="signed"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="mb-3">Fixture Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="p-0">
              <Button
                className="w-full"
                onClick={form.handleSubmit(onSubmit)}
                disabled={form.formState.isSubmitting}
              >
                Edit{" "}
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

export default EditPlayerModal;
