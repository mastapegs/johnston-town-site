import { z } from "zod";
import { categories } from "./categories";

export const listingInputSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    category: z.enum(categories),
    address: z.string().min(1),
    phone: z.string().min(1),
    website: z.url().optional(),
    hours: z.string().optional(),
    description: z.string().min(1),
  })
  .transform((listing) => ({
    ...listing,
    phoneHref: listing.phone.replace(/[^\d+]/g, "").replace(/(?!^)\+/g, ""),
  }));

export type ListingInput = z.output<typeof listingInputSchema>;

export const listingsArraySchema = z.array(listingInputSchema);
