'use client'

import { z } from "zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Input } from "@/components/ui/input";
import useAxiosAuth from "@/lib/hooks/use-axios-auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const fixtureSchema = z.object({
    home: z.string().min(1, 'Home team is required'),
    away: z.string().min(1, 'Away is required'),
    gameDate: z.date(),
    type: z.string().min(1, 'Please select fixture type')
})

type inputType = z.infer<typeof fixtureSchema>

const CreateFixtureModal = ({comp}:{comp:Competition}) => {
    const axiosAuth = useAxiosAuth()
    const router = useRouter()
    const {toast} = useToast()

    const form = useForm<inputType>({
        resolver: zodResolver(fixtureSchema),
        defaultValues: {
            home: '',
            away: '',
            gameDate: new Date(),
            type: ''
        }
    })

    const onSubmit = async (values: inputType) => {
        const fixture = {
            fixtures: {
                "team_a": values.home,
                "team_b": values.away,
                "game_date": format(values.gameDate, 'yyyy-MM-dd'),
                "field": null,
                "game_status": "NS",
                "score_team_a": null,
                "score_team_b": null,
                "fixture_type": values.type
            }
        }
        console.log(fixture)
        try {
            const res = await axiosAuth.post(`/api/competitions/${comp.id}/fixtures/`, fixture)
            console.log(res)
            if (res.status === 201) {
                toast({ description: "Fixture created" });
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
            <Button size='sm'>
                <PlusCircle className="w-4 h-4 mr-2" /> Fixture
            </Button>
        </DialogTrigger>

        <DialogContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
            control={form.control}
            name="home"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Home Team</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select home team" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {comp.teams.map((team) => (
                            <SelectItem value={team.id} key={team.id}>{team.team.team_name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="away"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Away Team</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select away team" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {comp.teams.map((team) => (
                            <SelectItem value={team.id} key={team.id}>{team.team.team_name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />

        <FormField
          control={form.control}
          name="gameDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Game Date</FormLabel>
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
            name="type"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Fixture Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select fixture type" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value='NO'>Normal</SelectItem>
                        <SelectItem value='RO'>Rolling</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />  

          {/* <FormField name="matchday" control={form.control} render={({field}) => (
            <FormItem>
                <FormLabel>Matchday</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="matchday 18" />
                </FormControl>
                <FormMessage />
            </FormItem>
          )} /> */}

          <DialogFooter>
            <DialogClose asChild>
                <Button type="submit" onClick={form.handleSubmit(onSubmit)}>Create</Button>
            </DialogClose>
          </DialogFooter>
           
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  )
}

export default CreateFixtureModal