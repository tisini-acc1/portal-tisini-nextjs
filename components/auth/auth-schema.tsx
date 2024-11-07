import validator from "validator";
import { z } from "zod";

export const regSchema = z
  .object({
    username: z
      .string()
      .min(3, "Should be greater than 3 characters long")
      .max(15, "Username should be less than 12 characters long"),
    // .regex(new RegExp("^[a-zA-Z]+$", "No special characters allowed!")),
    email: z.string().email(),
    phone_number: z
      .string()
      .refine(validator.isMobilePhone, "Please enter a valid phone number"),
    first_name: z
      .string()
      .min(3, "Provide a valid firstname")
      .max(15, "Provide a valid firstname"),
    last_name: z
      .string()
      .min(3, "Provide a valid lastname")
      .max(15, "Provide a valid lastname"),
    password: z.string().min(4).max(15),
    cfmPassword: z.string().min(4).max(15),
  })
  .refine((data) => data.password === data.cfmPassword, {
    message: "Confirm password should match password",
    path: ["cfmPassword"],
  });
