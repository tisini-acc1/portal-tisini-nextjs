"use client";

// import { useRouter } from "next/navigation";
import React from "react";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SubscribetoTournament } from "@/app/(dashboard)/teams/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const TournSubscribeModal = ({
  tournament,
}: {
  tournament: OpenCompetition;
}) => {
  const team = useStore((state) => state.store.team);
  // const serie = useStore((state) => state.store.serie);

  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: SubscribetoTournament,
    onSuccess(data) {
      console.log(data);
      router.refresh();

      toast("Success", { description: data.message });
      queryClient.invalidateQueries();
      if (data.error === "0") {
      } else if (data.error === "1") {
        toast("Error!", {
          description: data.message,
        });
      }
    },
    onError: (error) => {
      console.log(error);
      toast("Error!", {
        description: "An error occured while creating tournament",
      });
    },
  });

  async function onSubmit() {
    const data = {
      seasonid: tournament.latestseriesid as string,
      teamid: team.id,
    };

    mutation.mutate(data);
  }

  // console.log(tournament);
  // console.log(serie, team);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          className={"border-green-400 text-green-600"}
        >
          subscribe
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are in the process of subscribing to a new tournament for{" "}
            {team.name}.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onSubmit()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TournSubscribeModal;

// import { z } from "zod";
// import validator from "validator";
// import { format } from "date-fns";
// import { useForm } from "react-hook-form";
// // import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   CalendarIcon,
//   Check,
//   ChevronsUpDown,
//   Plus,
//   RotateCcw,
// } from "lucide-react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// import { cn } from "@/lib/utils";
// import { useStore } from "@/store/store";
// import { useToast } from "@/hooks/use-toast";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { addPlayer } from "@/actions/php-actions";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";

// const POSITIONTYPES = [
//   "Goal keeper",
//   "Defender",
//   "Midfielder",
//   "Forward",
// ] as const;

// export const playerSchema = z.object({
//   tournament: z.string().min(1, { message: "Tournament is required" }),
// });

// const TournSubscribeModal = () => {
//   const [selectedTourn, setSelectedTourn] = useState<Tourn>(tournaments[0]);
//   const [isPopoverOpen, setIsPopoverOpen] = useState(false);

//   const { toast } = useToast();
//   // const router = useRouter();
//   const [open, setOpen] = useState(false);
//   const { store } = useStore((state) => state);
//   const queryClient = useQueryClient();

//   const form = useForm<z.infer<typeof playerSchema>>({
//     resolver: zodResolver(playerSchema),
//     defaultValues: {
//       tournament: "",
//     },
//   });

//   useEffect(() => {
//     if (form.formState.errors) {
//       console.log("Validation errors:", form.formState.errors);
//     }
//   }, [form.formState.errors]);

//   const mutation = useMutation({
//     mutationFn: addPlayer,
//     onSuccess: (data) => {
//       // console.log(data);
//       if (data.error === "0") {
//         setOpen(false);
//         queryClient.invalidateQueries({ queryKey: ["allPlayers"] });
//         toast({ title: "Success", description: data.message });
//         form.reset();
//       } else {
//         toast({
//           title: "Error!",
//           variant: "destructive",
//           description: data.message,
//         });
//       }
//     },
//     onError: (error) => {
//       console.log(error);
//       toast({
//         title: "Error!",
//         variant: "destructive",
//         description: "An error occured while creating player",
//       });
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof playerSchema>) => {
//     const payload = {
//       tournament: values.tournament,
//     };

//     // mutation.mutate(player);
//   };

//   const onOpenChangeWrapper = (value: boolean) => {
//     setOpen(value);
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
//       <DialogTrigger asChild>
//         <Button size="sm" variant={"outline"}>
//           subscribe
//         </Button>
//       </DialogTrigger>

//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Are you sure?</DialogTitle>
//           <DialogDescription>
//             You are in the process of subscribing to a new tournament for{" "}
//             {store.team.name}.
//           </DialogDescription>
//         </DialogHeader>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   role="combobox"
//                   aria-expanded={open}
//                   className="w-full justify-between"
//                 >
//                   {selectedTourn
//                     ? selectedTourn.tournamentname
//                     : "Select tournament..."}
//                   <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                 </Button>
//               </PopoverTrigger>

//               <PopoverContent className="lg:w-[450px] p-0">
//                 <Command>
//                   <CommandInput placeholder="Search player..." />
//                   <CommandList>
//                     <CommandEmpty>No tournament found.</CommandEmpty>
//                     <CommandGroup>
//                       {tournaments.map((tourn) => (
//                         <CommandItem
//                           key={tourn.tournamentid}
//                           value={tourn.tournamentname}
//                           onSelect={() => {
//                             setSelectedTourn(tourn);
//                             setIsPopoverOpen(false);
//                           }}
//                         >
//                           <Check
//                             className={cn(
//                               "mr-2 h-4 w-4",
//                               selectedTourn?.tournamentid === tourn.tournamentid
//                                 ? "opacity-100"
//                                 : "opacity-0"
//                             )}
//                           />
//                           {tourn.tournamentname} {tourn.tournamentid}
//                         </CommandItem>
//                       ))}
//                     </CommandGroup>
//                   </CommandList>
//                 </Command>
//               </PopoverContent>
//             </Popover>

//             <DialogFooter className="p-0">
//               <Button
//                 className="w-full"
//                 onClick={form.handleSubmit(onSubmit)}
//                 disabled={form.formState.isSubmitting}
//               >
//                 Subscribe{" "}
//                 {form.formState.isSubmitting && mutation.isPending && (
//                   <RotateCcw className="ml-2 h-4 w-4 animate-spin" />
//                 )}
//               </Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// type Tourn = {
//   tournamentname: string;
//   tournamentid: string;
//   status: string;
//   fixture_type: string;
//   date_from: null | string;
//   date_to: null | string;
// };

// const tournaments: Tourn[] = [
//   {
//     tournamentname: "FKF Cup",
//     tournamentid: "32",
//     status: "1",
//     fixture_type: "football",
//     date_from: null,
//     date_to: null,
//   },
//   {
//     tournamentname: "FKF Premier League",
//     tournamentid: "205",
//     status: "1",
//     fixture_type: "football",
//     date_from: null,
//     date_to: null,
//   },
// ];

// export default TournSubscribeModal;
