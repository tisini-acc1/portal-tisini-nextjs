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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import { useState } from "react";

const date: Date = new Date();
const postions = ["Goalkeeper", "Defender", "Midfielder", "Forward"];

const CreatePlayerModal = ({ teamId }: { teamId: string }) => {
  const [open, setOpen] = useState(false);
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const router = useRouter();

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
      const res = await axiosAuth.post(`/api/teams/${teamId}/players/`, player);

      if (res.status === 201) {
        console.log(res);
        toast({ title: "Success", description: "Player created" });
        router.refresh();
      }
    } catch (err: any) {
      console.log(err);
      if (!err.response) {
        toast({
          description: "Network Error! Check your internet connection",
          variant: "destructive",
        });
      } else if (err.response.data) {
        if (err.response.status === 400) {
          toast({
            description: err.response.data?.player.license_no[0],
            variant: "destructive",
          });
          toast({
            description: err.response.data?.player.user.phone_number[0],
            variant: "destructive",
          });
          toast({
            description: err.response.data?.player.user.username[0],
            variant: "destructive",
          });
        }
      }
    }
  };

  const openChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={openChangeWrapper}>
      <DialogTrigger>
        <Button size="sm">
          <UserPlus className="mr-2 w-4 h-4" />
          Player
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-3">
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
            </div>

            <div className="flex flex-col md:flex-row gap-3">
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
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-3">
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
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-3">
              <FormField
                name="position"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                      <Input type="date" placeholder="1990-3-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">Create</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePlayerModal;
