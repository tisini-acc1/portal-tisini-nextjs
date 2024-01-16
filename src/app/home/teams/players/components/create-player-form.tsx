"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { playerSchema } from "./playerSchema";
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
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import useAxiosAuth from "@/lib/hooks/use-axios-auth";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const date: Date = new Date();
const postions = ["Goalkeeper", "Defender", "Midfielder", "Forward"];

const CreatePlayerForm = ({ team }: { team: Team[] }) => {
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const router = useRouter();

  const teamId = team[0].id;

  const form = useForm<z.infer<typeof playerSchema>>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      //   middleName: "",
      username: "",
      nationality: "",
      email: "",
      phoneNo: "",
      dob: "",
      licenseNo: "",
      jerseyNo: "",
      position: "Goalkeeper",
      signedDate: "",
      expiryDate: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof playerSchema>) => {
    const player = {
      player: {
        user: {
          username: data.username,
          email: data.email,
          phone_number: data.phoneNo,
          first_name: data.firstName,
          last_name: data.lastName,
          password: "player",
          is_tisini_staff: false,
          is_team_staff: false,
          is_player: true,
          is_referee: false,
          is_agent: false,
        },
        middle_name: "",
        dob: data.dob,
        nationality: data.nationality,
        profile_picture: null,
        license_no: data.licenseNo,
      },
      current_jersey_no: data.jerseyNo,
      current_position: data.position,
      signed_date: data.signedDate,
      expiry_date: data.expiryDate,
      status: false,
    };

    try {
      const res = await axiosAuth.post(
        `/users/teams/${teamId}/players/`,
        player
      );

      console.log(res);
      toast({ title: "Success", description: "Player created" });
      router.push("/home/team/players");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          name="firstName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>FirstName</FormLabel>
              <FormControl>
                <Input type="text" placeholder="John" {...field} />
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
              <FormLabel>lastName</FormLabel>
              <FormControl>
                <Input type="text" placeholder="doe" {...field} />
              </FormControl>
              <FormMessage />
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
              <FormMessage />
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
                <Input type="email" placeholder="doe@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
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
              <FormMessage />
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
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="position"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <FormMessage />
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
              <FormMessage />
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
              <FormMessage />
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
                <Input
                  type="date"
                  placeholder="1990-3-3"
                  {...field}
                  // value={
                  //   field.value instanceof Date
                  //     ? field.value.toISOString().split("T")[0]
                  //     : field.value
                  // }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
};

export default CreatePlayerForm;
