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
  dob: z.date(),
  nationality: z.string().min(3, { message: "Enter a valid nationality" }),
  licenseNo: z
    .string()
    .min(6, { message: "Enter a valid license number" })
    .max(10, { message: "Enter a valid license number" }),
  jerseyNo: z.number().gte(0),
  position: z.enum(["Goalkeeper", "Defender", "Midfielder", "Forward"]),
  signedDate: z.date(),
  expiryDate: z.date(),
});
