"use client";

import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
// import { RotateCcw } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useStore } from "@/lib/store";

const ProfileBio = () => {
  const user = useStore((state) => state.store.user);

  const name = user.name.split(" ");

  const form = useForm({
    defaultValues: {
      firstName: name[0],
      middleName: name[1],
      lastName: "",
      phone: user.phone,
      email: "",
    },
    mode: "onChange",
  });

  // const onSubmit = () => {
  //   console.log("first");
  // };

  return (
    <section className="p-5">
      <Form {...form}>
        <form className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>FirstName</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="middleName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MiddleName</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LastName</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone No.</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            className="w-full md:w-auto"
            // onClick={form.handleSubmit(onSubmit)}
            // disabled={form.formState.isSubmitting}
          >
            Update
            {/* <RotateCcw className="ml-2 h-4 w-4 animate-spin" /> */}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default ProfileBio;
