'use client'

import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { CalendarIcon, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAxiosAuth from "@/lib/hooks/use-axios-auth";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";


const compSchema = z.object({
  name: z.string(),
  type: z.string(),
  startDate: z.date(),
  endDate: z.date()
})

type compInput = z.infer<typeof compSchema>

const CreateTournamentDialog = () => {
  const axiosAuth = useAxiosAuth()
  const {toast} = useToast()
  const router = useRouter()

  const form = useForm<compInput>({
    resolver: zodResolver(compSchema),
    defaultValues: {
      name: '',
  type: '',
  startDate: undefined,
  endDate: undefined
    }
  })

  const onSubmit = async (values: compInput) => {
    const comp = {
      "competition": {
          "competition_type": values.type,
          "competition_name": values.name,
          "start_period": format(values.startDate, 'yyyy-MM-dd'),
          "end_period": format(values.endDate, 'yyyy-MM-dd'),
          "parent": null
      }
    }

    try {
      const res = await axiosAuth.post('/users/register_competition/', comp)

      if (res.status === 201) {
        toast({ description: "Created" });
        form.reset()
        router.refresh();
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" /> Tournament
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField name="name" control={form.control} render={({field}) => (
            <FormItem>
              <FormLabel>Competition name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Wabebe Cup" {...field} />
            </FormControl>
            <FormMessage />
            </FormItem>
          )} />

          <FormField name="type" control={form.control} render={({field}) => (
            <FormItem>
              <FormLabel>Competition type</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Tournament" {...field} />
            </FormControl>
            <FormMessage />
            </FormItem>
          )} />

        {/* <div className="flex"> */}
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
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
                    // disabled={(date) =>
                    //   date > new Date() || date < new Date("1900-01-01")
                    // }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
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
                    // disabled={(date) =>
                    //   date > new Date() || date < new Date("1900-01-01")
                    // }
                    initialFocus
                    />
                </PopoverContent>
              </Popover>
              
              <FormMessage />
            </FormItem>
          )}
          />
          {/* </div> */}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Create</Button>
            </DialogClose>
          </DialogFooter>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTournamentDialog;
