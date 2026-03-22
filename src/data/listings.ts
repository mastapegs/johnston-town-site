import coordinatesData from "./coordinates.generated.json";
import listingJson from "./listings.json";
import { listingsArraySchema } from "./schemas";
import { normalizePhone } from "../utils/normalizePhone";

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

export const categories = [
  "Food Assistance",
  "Healthcare & Mental Health",
  "Childcare",
  "Senior Services",
  "Municipal Services",
  "Shelters",
  "Parks & Recreation",
  "Entertainment",
  "Schools",
] as const;

export type Category = (typeof categories)[number];

interface ListingInput {
  id: string;
  name: string;
  category: Category;
  address: string;
  phone: string;
  website?: string;
  hours?: string;
  description: string;
}

const result = listingsArraySchema.safeParse(listingJson);
if (!result.success) {
  console.error("Listing data validation failed:", result.error.format());
}
const listingData: ListingInput[] = result.success
  ? result.data
  : (listingJson as ListingInput[]);

export const listings: Listing[] = listingData.map((listing) => {
  const coords = coordinates[listing.id];
  if (!coords) {
    console.warn(
      `Missing coordinates for "${listing.id}". Run: npm run geocode`,
    );
  }
  return {
    ...listing,
    phoneHref: normalizePhone(listing.phone),
    lat: coords?.lat ?? 0,
    lng: coords?.lng ?? 0,
  };
});
