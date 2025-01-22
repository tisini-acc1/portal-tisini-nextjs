import { z } from "zod";
import Image from "next/image";
import { format } from "date-fns";
import { RotateCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { calculateYearsOld } from "@/lib/utils";
import { createPlayerTransfer } from "@/actions/php-actions";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TransferProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
  player: TeamPlayer;
  // teams: Team[];
  tournaments: TeamTournament[];
};

const transferSchema = z.object({
  team: z.string().min(1, "Transfer to team is required"),
  amount: z.string().min(1, "Provide a valid transfer amount"),
  tournament: z.string().min(1, "Provide a valid league or tournament"),
});

const TransferDialog = ({
  open,
  setOpen,
  player,
  tournaments,
}: TransferProps) => {
  const { store } = useStore((state) => state);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof transferSchema>>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      team: "",
      amount: "",
      tournament: "",
    },
  });

  useEffect(() => {
    if (form.formState.errors) {
      console.log("Validation errors:", form.formState.errors);
    }
  }, [form.formState.errors]);

  const onSubmit = async (values: z.infer<typeof transferSchema>) => {
    const transfer = {
      player: player.player_id,
      team1: store.team.id,
      team2: values.team,
      amount: values.amount,
      fees: "0",
      tournament_id: values.tournament,
    };

    const res = await createPlayerTransfer(transfer);

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
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="hidden">
          Transfer
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer</DialogTitle>
          <DialogDescription>
            You are about to transfer <strong>{player?.pname}</strong> out of
            your team.
          </DialogDescription>
        </DialogHeader>

        {player && (
          <div className="flex items-center gap-4 h-20">
            <div>
              <Image
                src={"/footballer.jpg"}
                alt={"name"}
                width={50}
                height={50}
                className={
                  "h-full w-full object-cover rounded-sm aspect-square"
                }
              />
            </div>

            <div className="">
              <p className="text-xs text-gray-600 mb-1">
                <strong>
                  {player?.nationality}
                  {","}
                </strong>{" "}
                {calculateYearsOld(player?.dob)} year(s)
              </p>
              <p className="text-xs text-gray-600 mb-1">
                <strong>Jersey Number:</strong> {player?.current_jersey_no}
              </p>
              <p className="text-xs text-gray-600">
                <strong>Signed Date:</strong>{" "}
                {format(new Date(player?.signed_date), "d MMM, yyy")}
              </p>
            </div>
          </div>
        )}

        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="team"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transfer to</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="select type" />
                    </SelectTrigger>

                    <SelectContent>
                      {teamsData.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>

                    <FormMessage />
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tournament"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tournament</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="select type" />
                    </SelectTrigger>

                    <SelectContent>
                      {tournaments.map((tourn) => (
                        <SelectItem
                          key={tourn.tournamentid}
                          value={tourn.tournamentid}
                        >
                          {tourn.tournamentname}
                        </SelectItem>
                      ))}
                    </SelectContent>

                    <FormMessage />
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transfer Fee</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="100,000" {...field} />
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
                Transfer{" "}
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

export default TransferDialog;

const teamsData = [
  {
    id: "166",
    name: "Blak Blad",
    date_created: "2022-10-29 13:05:32",
  },
  {
    id: "167",
    name: "Strathmore Leos",
    date_created: "2022-10-29 13:05:59",
  },
  {
    id: "169",
    name: "Menengai Oilers",
    date_created: "2022-10-29 13:06:43",
  },
  {
    id: "194",
    name: "Mwamba",
    date_created: "2023-02-04 11:46:06",
  },
  {
    id: "243",
    name: "Kabras Sugar 15s",
    date_created: "2023-03-04 08:47:54",
  },
  {
    id: "244",
    name: "Kenya Harlequins KC",
    date_created: "2023-03-04 10:41:50",
  },
  {
    id: "246",
    name: "KCB KC",
    date_created: "2023-03-04 11:25:10",
  },
  {
    id: "603",
    name: "Impala KC",
    date_created: "2023-10-13 22:46:18",
  },
  {
    id: "607",
    name: "Menengai Oilers KC",
    date_created: "2023-10-13 22:48:43",
  },
  {
    id: "611",
    name: "Strathmore KC",
    date_created: "2023-10-13 23:09:33",
  },
  {
    id: "675",
    name: "Nondescripts KC",
    date_created: "2023-12-02 09:01:28",
  },
  {
    id: "702",
    name: "Quins 15s",
    date_created: "2023-12-09 11:08:52",
  },
  {
    id: "715",
    name: "Kisumu KC",
    date_created: "2023-12-16 08:03:24",
  },
  {
    id: "791",
    name: "Mwamba KC",
    date_created: "2024-01-15 09:59:51",
  },
  {
    id: "796",
    name: "Nakuru KC",
    date_created: "2024-01-19 12:23:18",
  },
  {
    id: "797",
    name: "Kabras KC",
    date_created: "2024-01-19 12:23:30",
  },
  {
    id: "800",
    name: "Impala 15s",
    date_created: "2024-01-19 12:28:47",
  },
  {
    id: "811",
    name: "Blakblad 15s",
    date_created: "2024-01-27 08:25:26",
  },
  {
    id: "819",
    name: "Daystar 15s",
    date_created: "2024-01-30 08:30:57",
  },
  {
    id: "820",
    name: "South Coast KC",
    date_created: "2024-01-30 08:46:47",
  },
  {
    id: "899",
    name: "Western bulls",
    date_created: "2024-03-16 08:13:25",
  },
  {
    id: "1",
    name: "Bidco United",
    date_created: "2021-03-22 11:02:27",
  },
  {
    id: "2",
    name: "Gor Mahia",
    date_created: "2021-03-22 11:02:27",
  },
  {
    id: "5",
    name: "Tusker Fc",
    date_created: "2021-04-03 08:39:21",
  },
  {
    id: "6",
    name: "KCB FC",
    date_created: "2021-04-04 09:55:37",
  },
  {
    id: "7",
    name: "Kariobangi Sharks",
    date_created: "2021-04-04 09:56:46",
  },
  {
    id: "10",
    name: "Posta Rangers",
    date_created: "2021-04-04 09:59:58",
  },
  {
    id: "12",
    name: "Bandari FC",
    date_created: "2021-04-10 07:28:33",
  },
  {
    id: "18",
    name: "Mathare United FC",
    date_created: "2021-04-10 07:46:55",
  },
  {
    id: "36",
    name: "Kakamega Homeboyz",
    date_created: "2021-09-04 10:58:34",
  },
  {
    id: "76",
    name: "Nairobi City Stars",
    date_created: "2022-04-23 10:45:32",
  },
  {
    id: "77",
    name: "Sofapaka",
    date_created: "2022-04-23 11:30:09",
  },
  {
    id: "84",
    name: "Muranga Seal",
    date_created: "2022-05-01 10:51:39",
  },
  {
    id: "85",
    name: "Kenya Police FC",
    date_created: "2022-05-01 10:59:16",
  },
  {
    id: "112",
    name: "Talanta FC",
    date_created: "2022-06-11 09:43:29",
  },
  {
    id: "147",
    name: "AFC Leopards",
    date_created: "2022-09-04 09:05:37",
  },
  {
    id: "149",
    name: "Ulinzi Stars",
    date_created: "2022-09-04 09:11:16",
  },
  {
    id: "248",
    name: "Mara Sugar",
    date_created: "2023-03-05 10:32:35",
  },
  {
    id: "595",
    name: "Shabana FC",
    date_created: "2023-10-01 12:10:55",
  },
];
