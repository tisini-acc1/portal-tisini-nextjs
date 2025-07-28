// "use client";

// import { z } from "zod";
// import { format } from "date-fns";
// import { useForm } from "react-hook-form";
// import { useEffect, useState } from "react";
// // import { useMutation } from "@tanstack/react-query";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { RotateCcw, Edit, CalendarIcon, Plus } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
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
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { addPlayer } from "@/actions/php-actions";
// import { useToast } from "@/hooks/use-toast";
// import { useStore } from "@/store/store";
// import validator from "validator";

// type EditProps = {
//   open: boolean;
//   setOpen: (v: boolean) => void;
//   player: TeamPlayer;
//   countries: Country[];
// };

// const POSITIONTYPES = [
//   "Goal keeper",
//   "Defender",
//   "Midfielder",
//   "Forward",
// ] as const;

// const playerSchema = z.object({
//   // middlename: z
//   //   .string()
//   //   .min(3, "Should be greater than 3 characters long")
//   //   .max(15, "Username should be less than 12 characters long"),
//   // // .regex(new RegExp("^[a-zA-Z]+$", "No special characters allowed!")),
//   // email: z.string().email(),
//   phone: z
//     .string()
//     .refine(validator.isMobilePhone, "Please enter a valid phone number"),
//   firstName: z
//     .string()
//     .min(3, "Provide a valid firstname")
//     .max(15, "Provide a valid firstname"),
//   lastName: z
//     .string()
//     .min(3, "Provide a valid lastname")
//     .max(15, "Provide a valid lastname"),
//   idNumber: z
//     .string()
//     .min(6, "Provide a ID number or birth cert number")
//     .max(15, "Provide a ID number or birth cert number"),
//   dob: z.date({
//     required_error: "Match date is required.",
//   }),
//   nationality: z.string().min(1, { message: "Nationality is required" }),
//   position: z.string().min(1, { message: "Position is required" }),
//   // team: z.string().min(1, { message: "Matchday is required" }),
//   jersey: z.string().min(1, { message: "Matchday is required" }),
//   signed: z.date({
//     required_error: "Match date is required.",
//   }),
// });

// const EditPlayerForm = ({ open, setOpen, player, countries }: EditProps) => {
//   const { toast } = useToast();
//   // const router = useRouter();
//   // const [open, setOpen] = useState(false);
//   const team = useStore((state) => state.store.team);
//   const user = useStore((state) => state.store.user);
//   const queryClient = useQueryClient();

//   const form = useForm<z.infer<typeof playerSchema>>({
//     resolver: zodResolver(playerSchema),
//     defaultValues: {
//       phone: "",
//       firstName: player.pname.split(" ")[0],
//       lastName: player.pname.split(" ")[1],
//       dob: new Date(player.dob),
//       nationality: player.nationality,
//       position: "",
//       idNumber: player.id_no || "",
//       jersey: player.current_jersey_no,
//       signed: new Date(player.signed_date),
//     },
//   });

//   //   useEffect(() => {
//   //     if (form.formState.errors) {
//   //       console.log("Validation errors:", form.formState.errors);
//   //     }
//   //   }, [form.formState.errors]);

//   const mutation = useMutation({
//     mutationFn: addPlayer,
//     onSuccess: (data) => {
//       // console.log(data);
//       if (data.error === "0") {
//         setOpen(false);
//         queryClient.invalidateQueries({ queryKey: ["allPlayers", team.id] });
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

//   const onSubmit = async (data: z.infer<typeof playerSchema>) => {
//     const player = {
//       idno: data.idNumber,
//       phone: data.phone,
//       fname: data.firstName,
//       sname: data.lastName,
//       oname: "",
//       playerdob: format(data.dob, "yyyy-M-d"),
//       countrycode: data.nationality,
//       position: data.position,
//       email: "",
//       agent: user.id,
//       teamid: team.id,
//       jersey: data.jersey,
//       contract: format(data.signed, "yyyy-M-d"),
//     };

//     console.log(player);
//     // mutation.mutate(player);
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         <div className="flex gap-2">
//           <FormField
//             control={form.control}
//             name="firstName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>First Name</FormLabel>
//                 <FormControl>
//                   <Input type="text" placeholder="John" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="lastName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Last Name</FormLabel>
//                 <FormControl>
//                   <Input type="text" placeholder="Doe" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <FormField
//           control={form.control}
//           name="idNumber"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>
//                 ID number or Birth Certificate number or UP number
//               </FormLabel>
//               <FormControl>
//                 <Input type="text" placeholder="John" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <div className="flex gap-2">
//           <FormField
//             control={form.control}
//             name="phone"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Phone Number</FormLabel>
//                 <FormControl>
//                   <Input type="text" placeholder="John" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="jersey"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Jersey Number</FormLabel>
//                 <FormControl>
//                   <Input type="text" placeholder="65" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <div className="flex gap-2">
//           <div className="w-1/2">
//             <FormField
//               control={form.control}
//               name="nationality"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Country</FormLabel>
//                   <Select onValueChange={field.onChange} defaultValue="404">
//                     <SelectTrigger>
//                       <SelectValue placeholder="select type" />
//                     </SelectTrigger>

//                     <SelectContent>
//                       {countries.map((country) => (
//                         <SelectItem key={country.id} value={country.id}>
//                           {country.en_short_name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>

//                     <FormMessage />
//                   </Select>
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="w-1/2">
//             <FormField
//               control={form.control}
//               name="position"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Position</FormLabel>
//                   <Select onValueChange={field.onChange}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="select type" />
//                     </SelectTrigger>

//                     <SelectContent>
//                       {POSITIONTYPES.map((type, idx) => (
//                         <SelectItem key={idx} value={type}>
//                           {type}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>

//                     <FormMessage />
//                   </Select>
//                 </FormItem>
//               )}
//             />
//           </div>
//         </div>

//         <div className="flex gap-2">
//           <div className="w-1/2">
//             <FormField
//               control={form.control}
//               name="dob"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel className="mb-3">Date of Birth</FormLabel>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <FormControl>
//                         <Button
//                           variant={"outline"}
//                           className={cn(
//                             "w-full pl-3 text-left font-normal",
//                             !field.value && "text-muted-foreground"
//                           )}
//                         >
//                           {field.value ? (
//                             format(field.value, "PPP")
//                           ) : (
//                             <span>Pick a date</span>
//                           )}
//                           <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                         </Button>
//                       </FormControl>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0" align="start">
//                       <Calendar
//                         mode="single"
//                         selected={field.value}
//                         onSelect={field.onChange}
//                         disabled={(date) =>
//                           date > new Date() || date < new Date("1900-01-01")
//                         }
//                         initialFocus
//                       />
//                     </PopoverContent>
//                   </Popover>

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="w-1/2">
//             <FormField
//               control={form.control}
//               name="signed"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel className="mb-3">Sign Date</FormLabel>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <FormControl>
//                         <Button
//                           variant={"outline"}
//                           className={cn(
//                             "w-full pl-3 text-left font-normal",
//                             !field.value && "text-muted-foreground"
//                           )}
//                         >
//                           {field.value ? (
//                             format(field.value, "PPP")
//                           ) : (
//                             <span>Pick a date</span>
//                           )}
//                           <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                         </Button>
//                       </FormControl>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0" align="start">
//                       <Calendar
//                         mode="single"
//                         selected={field.value}
//                         onSelect={field.onChange}
//                         disabled={(date) =>
//                           date > new Date() || date < new Date("1900-01-01")
//                         }
//                         initialFocus
//                       />
//                     </PopoverContent>
//                   </Popover>

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//         </div>

//         <DialogFooter className="p-0">
//           <Button
//             className="w-full"
//             onClick={form.handleSubmit(onSubmit)}
//             // disabled={mutation.isPending}
//           >
//             Create{" "}
//             {/* {mutation.isPending && (
//                   <RotateCcw className="ml-2 h-4 w-4 animate-spin" />
//                 )} */}
//           </Button>
//         </DialogFooter>
//       </form>
//     </Form>
//   );
// };

// export default EditPlayerForm;
import React from "react";

const Edit = () => {
  return <div>Edit</div>;
};

export default Edit;
