import coordinatesData from "./coordinates.generated.json";

const coordinates: Record<string, { lat: number; lng: number }> =
  coordinatesData;

export interface Listing {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  website?: string;
  hours?: string;
  description: string;
  lat: number;
  lng: number;
}

export const categories = [
  "Food Assistance",
  "Healthcare",
  "Childcare",
  "Senior Services",
  "Mental Health",
  "Municipal Services",
  "Shelters",
] as const;

interface ListingInput {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  website?: string;
  hours?: string;
  description: string;
}

const listingData: ListingInput[] = [
  {
    id: "johnston-senior-center",
    name: "Johnston Senior Center",
    category: "Senior Services",
    address: "1291 Hartford Ave, Johnston, RI 02919",
    phone: "(401) 944-3343",
    hours: "Mon–Fri 8:30 AM – 4:00 PM",
    description:
      "Programs, meals, and social activities for Johnston seniors. Transportation assistance available.",
  },
  {
    id: "johnston-town-hall",
    name: "Johnston Town Hall",
    category: "Municipal Services",
    address: "1385 Hartford Ave, Johnston, RI 02919",
    phone: "(401) 351-6618",
    website: "https://www.townofjohnstonri.com",
    hours: "Mon–Fri 8:30 AM – 4:30 PM",
    description:
      "Town government offices including tax assessor, building permits, vital records, and general administration.",
  },
  {
    id: "tri-county-community-action",
    name: "Tri-County Community Action Agency",
    category: "Food Assistance",
    address: "1126 Hartford Ave, Johnston, RI 02919",
    phone: "(401) 519-1890",
    website: "https://www.tricountyri.org",
    hours: "Mon–Fri 8:00 AM – 4:00 PM",
    description:
      "Food pantry, fuel assistance, and emergency services for individuals and families in need.",
  },
  {
    id: "johnston-public-library",
    name: "Marian J. Mohr Memorial Library",
    category: "Municipal Services",
    address: "1 Memorial Ave, Johnston, RI 02919",
    phone: "(401) 231-4980",
    website: "https://www.mohrlibrary.org",
    hours: "Mon–Thu 9 AM – 8 PM, Fri–Sat 9 AM – 5 PM",
    description:
      "Public library offering books, digital resources, community programs, and meeting spaces.",
  },
  {
    id: "lollipop-learning-center",
    name: "Lollipop Learning Center",
    category: "Childcare",
    address: "2766B Hartford Ave, Johnston, RI 02919",
    phone: "(401) 764-0468",
    website: "https://lollipoplearningri.com",
    hours: "Mon–Fri 7:00 AM – 5:30 PM",
    description:
      "Licensed childcare center for ages 2 months to 5 years. DCYF-certified with qualified teachers and an on-site nurse. Curriculum focused on language, reading readiness, and physical, social, and emotional development.",
  },
  {
    id: "operation-stand-down-ri",
    name: "Operation Stand Down Rhode Island",
    category: "Shelters",
    address: "1010 Hartford Ave, Johnston, RI 02919",
    phone: "(401) 383-4730",
    website: "https://osdri.org",
    hours: "Mon–Fri 8:30 AM – 4:30 PM",
    description:
      "Rhode Island's primary nonprofit resource for homeless and at-risk veterans. Provides emergency and permanent housing, case management, mental health and substance abuse treatment coordination, employment assistance, and a food pantry.",
  },
  {
    id: "crossroads-rhode-island",
    name: "Crossroads Rhode Island",
    category: "Shelters",
    address: "160 Broad St, Providence, RI 02903",
    phone: "(401) 521-2255",
    website: "https://www.crossroadsri.org",
    hours: "Hotline: Mon–Fri 9 AM – 9 PM, Sat–Sun 9 AM – 2 PM",
    description:
      "Rhode Island's largest homeless services organization. Operates emergency shelters for men, women, families, and couples. Also provides domestic violence services with a 24/7 helpline at (401) 861-2760.",
  },
  {
    id: "providence-rescue-mission",
    name: "Providence Rescue Mission",
    category: "Shelters",
    address: "627 Cranston St, Providence, RI 02907",
    phone: "(401) 274-8861",
    website: "https://www.providencerescuemission.org",
    hours: "Open 24/7",
    description:
      "Emergency overnight shelter for homeless men and women. Provides three hot meals daily, warm showers, clean clothing, a food pantry, dental services, and a one-year discipleship program.",
  },
  {
    id: "amos-house",
    name: "Amos House",
    category: "Shelters",
    address: "460 Pine St, Providence, RI 02907",
    phone: "(401) 272-0220",
    website: "https://amoshouse.com",
    hours: "Mon–Thu 8:00 AM – 4:00 PM, Fri 8:00 AM – 1:00 PM",
    description:
      "Nonprofit providing shelter housing, the state's largest soup kitchen, and social services for individuals who are hungry, homeless, or in crisis. Offers case management, mental health care, and recovery support.",
  },
];

export const listings: Listing[] = listingData.map((listing) => {
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
