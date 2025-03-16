"use client";

import { z } from "zod";
import validator from "validator";
import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, RotateCcw } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createOfficial } from "@/actions/php-actions";
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

const regSchema = z.object({
  middlename: z
    .string()
    .min(3, "Should be greater than 3 characters long")
    .max(15, "Username should be less than 12 characters long"),
  // .regex(new RegExp("^[a-zA-Z]+$", "No special characters allowed!")),
  email: z.string().email(),
  phone_number: z
    .string()
    .refine(validator.isMobilePhone, "Please enter a valid phone number"),
  first_name: z
    .string()
    .min(3, "Provide a valid firstname")
    .max(15, "Provide a valid firstname"),
  last_name: z
    .string()
    .min(3, "Provide a valid lastname")
    .max(15, "Provide a valid lastname"),
  id_number: z
    .string()
    .min(6, "Provide a ID number or birth cert number")
    .max(15, "Provide a ID number or birth cert number"),
});

const CreateOfficialsModal = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof regSchema>>({
    resolver: zodResolver(regSchema),
    defaultValues: {
      middlename: "",
      email: "",
      phone_number: "",
      first_name: "",
      last_name: "",
      id_number: "",
    },
  });

  useEffect(() => {
    if (form.formState.errors) {
      console.log("Validation errors:", form.formState.errors);
    }
  }, [form.formState.errors]);

  const mutation = useMutation({
    mutationFn: createOfficial,
    onSuccess: (data) => {
      console.log(data);
      if (data.error === "0") {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["tournamentOfficials"] });
        toast({ title: "Succes", description: data.message });
      } else {
        toast({
          title: "Error!",
          variant: "destructive",
          description: data.message,
        });
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = async (data: z.infer<typeof regSchema>) => {
    const player = {
      id_no: data.id_number,
      email: data.email,
      phone_number: data.phone_number,
      first_name: data.first_name,
      last_name: data.middlename,
      sirname: data.last_name,
      password: data.id_number.slice(1, 5),
      role: "9",
      fixtype: "2", // add fetch fixtype from backend
      action: "registeruser",
    };

    mutation.mutate(player);
  };

  const onOpenChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="w-4 h-4" /> Match Official
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Match Official</DialogTitle>
          <DialogDescription>
            You are in the process of creating a new Match Official.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firstname:</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="john" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lastname:</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="middlename"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middlename:</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="doety" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number:</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="0700000000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="doe@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="id_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID number</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="John" {...field} />
                  </FormControl>
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
                Create{" "}
                {form.formState.isSubmitting && mutation.isPending && (
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

export default CreateOfficialsModal;
