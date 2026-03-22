import type { ZodError } from "zod";
import coordinatesData from "./coordinates.generated.json";
import listingJson from "./listings.json";
import { listingsArraySchema, type ListingInput } from "./schemas";
import type { Category } from "./categories";

const coordinates: Record<string, { lat: number; lng: number }> =
  coordinatesData;

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

function hydrate(data: ListingInput[]): Listing[] {
  return data.map((listing) => {
    const coords = coordinates[listing.id];
    if (!coords) {
      console.warn(
        `Missing coordinates for "${listing.id}". Run: npm run geocode`,
      );
    }
    return {
      ...listing,
      lat: coords?.lat ?? 0,
      lng: coords?.lng ?? 0,
    };
  });
}

const result = listingsArraySchema.safeParse(listingJson);

export const listingsResult: ListingsResult = result.success
  ? { success: true, listings: hydrate(result.data) }
  : { success: false, error: result.error };
