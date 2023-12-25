"use client";

import { Form, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";

// const compSchema = z.object({

//         "id": "754963d5-37ac-496a-91c9-0014891d4f64",
//         "competition_type": "Tournament",
//         "competition_name": "Rausha Kipaji",
//         "created_at": "2023-11-24",
//         "start_period": "2023-11-01",
//         "end_period": "2023-11-30",
//         "teams": []

// })

const RegisterCompForm = ({ comps }: { comps: Competition[] }) => {
  const form = useForm({
    defaultValues: {
      competition: "",
    },
  });
  return (
    <Form {...form}>
      <form>
        <FormField
          name="competition"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="" />
                </SelectTrigger>

                <SelectContent>
                  {comps.map((comp) => (
                    <SelectItem key={comp.id} value={comp.id}>
                      {comp.competition_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default RegisterCompForm;
