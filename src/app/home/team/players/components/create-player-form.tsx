"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { playerSchema } from "./playerSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const date: Date = new Date();
const postions = ["Goalkeeper", "Defender", "Midfielder", "Forward"];

const CreatePlayerForm = () => {
  const form = useForm<z.infer<typeof playerSchema>>({
    defaultValues: {
      firstName: "",
      lastName: "",
      //   middleName: "",
      username: "",
      nationality: "",
      email: "",
      phoneNo: "",
      dob: date,
      licenseNo: "",
      jerseyNo: 0,
      position: "Goalkeeper",
      signedDate: date,
      expiryDate: date,
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-3">
        <FormField
          name="firstName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>FirstName</FormLabel>
              <FormControl>
                <Input type="text" placeholder="John" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="lastName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>lastName</FormLabel>
              <FormControl>
                <Input type="text" placeholder="doe" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Johnte" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="nationality"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nationality</FormLabel>
              <FormControl>
                <Input type="text" placeholder="kenyan" {...field} />
              </FormControl>
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
                <Input type="email" placeholder="doe@gmail.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="phoneNo"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="text" placeholder="0700000000" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="dob"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of birth</FormLabel>
              <FormControl>
                <Input type="date" placeholder="1990-3-3" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="licenseNo"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>License Number</FormLabel>
              <FormControl>
                <Input type="number" placeholder="FKF7000" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="position"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Goalkeeper" />
                </SelectTrigger>

                <SelectContent>
                  {postions.map((pos, idx) => (
                    <SelectItem key={idx} value={pos}>
                      {pos}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          name="jerseyNo"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jersey Number</FormLabel>
              <FormControl>
                <Input type="number" placeholder="10" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="signedDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contract Starts</FormLabel>
              <FormControl>
                <Input type="date" placeholder="1990-3-3" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="expiryDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contract Ends</FormLabel>
              <FormControl>
                <Input type="date" placeholder="1990-3-3" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
};

export default CreatePlayerForm;
