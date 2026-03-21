import coordinatesData from "./coordinates.generated.json";

const coordinates: Record<string, { lat: number; lng: number }> =
  coordinatesData;

export interface Listing {
  id: string;
  name: string;
  category: Category;
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
  "Healthcare & Mental Health",
  "Childcare",
  "Senior Services",
  "Municipal Services",
  "Shelters",
  "Parks",
  "Entertainment",
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
  {
    id: "ocean-state-medical",
    name: "Ocean State Medical",
    category: "Healthcare & Mental Health",
    address: "1539 Atwood Ave, Suite 101, Johnston, RI 02919",
    phone: "(401) 272-3410",
    website: "https://www.oceanstatemedical.org",
    hours:
      "Mon–Thu 6:00 AM – 5:00 PM, Fri 7:00 AM – 12:00 PM, Sat 8:00 AM – 12:00 PM",
    description:
      "Comprehensive primary care practice offering preventative medicine and telehealth services. Patient-Centered Medical Home located inside the Johnston Medical Center.",
  },
  {
    id: "tricounty-community-health-center",
    name: "TriCounty Community Health Center",
    category: "Healthcare & Mental Health",
    address: "1126 Hartford Ave, Johnston, RI 02919",
    phone: "(401) 351-2750",
    website: "https://www.tricountyri.org/services/health-center",
    hours: "Mon–Wed 8:00 AM – 8:00 PM, Thu–Fri 8:00 AM – 5:00 PM",
    description:
      "Federally Qualified Health Center offering family medicine, behavioral health, substance abuse treatment, counseling, and dental care. Sliding fee scale available.",
  },
  {
    id: "brown-health-urgent-care-johnston",
    name: "Brown University Health Urgent Care",
    category: "Healthcare & Mental Health",
    address: "11 Commerce Way, Unit 5, Johnston, RI 02919",
    phone: "(401) 606-2610",
    website: "https://www.brownhealth.org",
    hours: "Mon–Fri 8:00 AM – 8:00 PM, Sat–Sun 8:00 AM – 6:00 PM",
    description:
      "Walk-in urgent care clinic treating adults and children 18 months and older. Offers X-rays, flu and tetanus shots, COVID testing, and sports physicals.",
  },
  {
    id: "johnston-urgent-care-mdri",
    name: "Johnston Urgent Care (MDRI)",
    category: "Healthcare & Mental Health",
    address: "1239 Hartford Ave, Johnston, RI 02919",
    phone: "(401) 209-1730",
    website: "https://mymdri.com/johnstonuc",
    hours: "Mon–Fri 9:00 AM – 4:30 PM, Sat 9:00 AM – 2:00 PM",
    description:
      "Local urgent care treating minor injuries, sprains, fractures, colds, flu, and infections. On-site X-rays, lab testing, and physicals available.",
  },
  {
    id: "atmed-treatment-center",
    name: "Atmed Treatment Center",
    category: "Healthcare & Mental Health",
    address: "1526 Atwood Ave, Suite 100, Johnston, RI 02919",
    phone: "(401) 273-9400",
    website: "https://www.atmedurgentcare.net",
    hours: "Open 7 days a week",
    description:
      "Urgent care providing comprehensive outpatient health care for non-life-threatening illnesses and injuries. Walk-ins welcome, no appointment necessary.",
  },
  {
    id: "inner-you-counseling-center",
    name: "Inner You Counseling Center",
    category: "Healthcare & Mental Health",
    address: "190 Putnam Pike, Suite 1, Johnston, RI 02919",
    phone: "(401) 773-7116",
    website: "https://inneryoucounselingri.com",
    hours: "Mon–Fri 9:00 AM – 9:00 PM, Sat–Sun 9:00 AM – 5:00 PM",
    description:
      "Counseling center offering individual, couples, and family therapy. Accepts all insurances with a sliding scale for uninsured clients.",
  },
  {
    id: "ellie-mental-health-johnston",
    name: "Ellie Mental Health - Johnston",
    category: "Healthcare & Mental Health",
    address: "1526 Atwood Ave, Suite 104, Johnston, RI 02919",
    phone: "(401) 361-3788",
    website: "https://elliementalhealth.com",
    hours: "Mon–Fri 7:00 AM – 9:00 PM, Sat 9:00 AM – 5:00 PM",
    description:
      "Individual, family, and couples therapy for ages 5 and up. Treats anxiety, depression, trauma, substance use, and relationship challenges. In-person and telehealth sessions available.",
  },
  {
    id: "johnston-war-memorial-park",
    name: "Johnston War Memorial Park",
    category: "Parks",
    address: "1583 Hartford Ave, Johnston, RI 02919",
    phone: "(401) 272-3460",
    website: "https://johnstonrec.com",
    hours: "Daily 6:00 AM – 10:00 PM",
    description:
      "26-acre town park with baseball and softball diamonds, basketball and tennis courts, an ADA-accessible inclusive playground, splash pad, fishing pond, one-mile walking trail, picnic areas, and a veterans memorial.",
  },
  {
    id: "snake-den-state-park",
    name: "Snake Den State Park",
    category: "Parks",
    address: "2321 Hartford Ave, Johnston, RI 02919",
    phone: "(401) 222-2632",
    website: "https://riparks.ri.gov",
    hours: "Daily 6:00 AM – 8:00 PM",
    description:
      "1,000-acre state park featuring hiking trails, open fields, and the historic Dame Farm. A largely undeveloped natural setting ideal for hiking, nature walks, and birdwatching.",
  },
  {
    id: "buttonhole-golf-course",
    name: "Buttonhole Golf Course",
    category: "Parks",
    address: "1 Button Hole Dr, Providence, RI 02908",
    phone: "(401) 421-1664",
    website: "https://www.buttonhole.org",
    description:
      "Non-profit 9-hole public golf course on the Johnston border along the Woonasquatucket River Greenway. Focused on youth golf education and accessible play.",
  },
  {
    id: "cw-theaters-lanes-games",
    name: "CW Theaters, Lanes & Games",
    category: "Entertainment",
    address: "622 George Washington Hwy, Lincoln, RI 02865",
    phone: "(401) 288-3543",
    website: "https://www.cwtheaters.com",
    hours:
      "Mon–Thu 3:00 – 10:00 PM, Fri 3:00 – 11:00 PM, Sat 11:00 AM – 11:00 PM, Sun 11:00 AM – 10:00 PM",
    description:
      "All-in-one entertainment complex adjacent to Johnston with a 16-screen movie theater, 22 bowling lanes, laser tag, arcade, and full-service restaurant and bar.",
  },
  {
    id: "apple-cinemas-warwick",
    name: "Apple Cinemas - Warwick Mall",
    category: "Entertainment",
    address: "400 Bald Hill Rd, Warwick, RI 02886",
    phone: "(401) 735-0088",
    website: "https://www.applecinemas.com",
    hours: "Daily 11:00 AM – 10:30 PM",
    description:
      "12-screen movie theater with laser projectors, Dolby 7.1 surround sound, luxury reclining seats, and a full bar. About 15 minutes from Johnston.",
  },
  {
    id: "showcase-cinemas-warwick",
    name: "Showcase Cinemas Warwick",
    category: "Entertainment",
    address: "1200 Quaker Ln, Warwick, RI 02886",
    phone: "(800) 315-4000",
    website: "https://www.showcasecinemas.com",
    hours: "Mon–Fri 12:00 – 10:00 PM, Sat–Sun 12:00 – 11:00 PM",
    description:
      "Modern cinema with luxury recliners, reserved seating, RealD 3D, and XPlus Laser auditorium with Dolby Atmos. Offers Bargain Tuesdays and Senior Wednesdays.",
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
