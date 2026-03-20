export interface Listing {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  website?: string;
  hours?: string;
  description: string;
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

export const listings: Listing[] = [
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
];
