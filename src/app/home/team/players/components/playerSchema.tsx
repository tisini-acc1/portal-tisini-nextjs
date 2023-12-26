import { z } from "zod";

export const playerSchema = z.object({
  username: z.string().min(3, { message: "Username is required" }),
  email: z.string().email({ message: "Email is required" }),
  phoneNo: z
    .string()
    .min(10, { message: "Phone number is required" })
    .max(10, { message: "Phone number is required" }),
  firstName: z.string().min(3, { message: "Enter a valid firstname" }),
  lastName: z.string().min(3, { message: "Enter a valid lastname" }),
  //   middleName: z.string(),
  dob: z.string().min(3, { message: "Enter a valid date of birth" }),
  nationality: z.string().min(3, { message: "Enter a valid nationality" }),
  licenseNo: z
    .string()
    .min(6, { message: "Enter a valid license number" })
    .max(10, { message: "Enter a valid license number" }),
  jerseyNo: z.string().refine((value) => !isNaN(Number(value)), {
    message: "Jersey number must be a valid number.",
  }),
  position: z.enum(["Goalkeeper", "Defender", "Midfielder", "Forward"]),
  signedDate: z
    .string()
    .min(3, { message: "Enter a valid contract start date" }),
  expiryDate: z
    .string()
    .min(3, { message: "Enter a valid contract expiry date" }),
});
