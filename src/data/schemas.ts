import { z } from "zod";
import { categories } from "./listings";

export const listingInputSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.enum(categories),
  address: z.string().min(1),
  phone: z.string().min(1),
  website: z.string().url().optional(),
  hours: z.string().optional(),
  description: z.string().min(1),
});

export const listingsArraySchema = z.array(listingInputSchema);
