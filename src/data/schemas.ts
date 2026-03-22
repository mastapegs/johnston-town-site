import { z } from "zod";
import { categories } from "./categories";

/**
 * Matches US phone numbers in common formats:
 *
 * - `(401) 944-3343`
 * - `(401) 944 3343`
 * - `401-944-3343`
 * - `401.944.3343`
 * - `401 944 3343`
 * - `4019443343`
 * - `1-401-944-3343`
 */
const usPhoneRegex = /^1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

export const listingInputSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    category: z.enum(categories),
    address: z.string().min(1),
    phone: z.string().regex(usPhoneRegex, "Invalid US phone number"),
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
