import type { ZodError } from "zod";
import listingJson from "./listings.json";
import { listingsArraySchema } from "./schemas";
import type { Category } from "./categories";

export interface Listing {
  id: string;
  name: string;
  category: Category;
  address: string;
  phone: string;
  phoneHref: string;
  website?: string;
  hours?: string;
  description: string;
  lat: number;
  lng: number;
}

export { categories, type Category } from "./categories";

export type ListingsResult =
  | { success: true; listings: Listing[] }
  | { success: false; error: ZodError };

const result = listingsArraySchema.safeParse(listingJson);

export const listingsResult: ListingsResult = result.success
  ? { success: true, listings: result.data }
  : { success: false, error: result.error };
