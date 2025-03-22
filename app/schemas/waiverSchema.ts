import { z } from "zod";

export const waiverSchema = z.object({
  name: z.string().min(1, "Name is required"),
  date: z.string().min(1, "Date is required"),
  signature: z.string().min(1, "Signature is required"),
  terms: z.boolean().refine(val => val, { message: "You must accept the terms" }),
  liability: z.boolean().refine(val => val, { message: "You must release liability" }),
});

export type WaiverSchema = z.infer<typeof waiverSchema>;
