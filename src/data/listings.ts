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
    id: "johnston-police-department",
    name: "Johnston Police Department",
    category: "Municipal Services",
    address: "1651 Atwood Ave, Johnston, RI 02919",
    phone: "(401) 231-4210",
    website: "https://www.johnstonpd.com",
    hours: "24/7",
    description:
      "Full-service municipal police department providing law enforcement, emergency response, and animal control services for the Town of Johnston.",
  },
  {
    id: "johnston-fire-department-hq",
    name: "Johnston Fire Department — Headquarters",
    category: "Municipal Services",
    address: "1520 Atwood Ave, Johnston, RI 02919",
    phone: "(401) 351-1600",
    website: "https://www.johnstonfireri.com",
    hours: "24/7",
    description:
      "Fire department headquarters housing Engine 3, Rescue 3, Ladder 1, and administrative offices. The department operates 4 stations across town.",
  },
  {
    id: "johnston-dpw",
    name: "Johnston Department of Public Works",
    category: "Municipal Services",
    address: "100 Irons Ave, Johnston, RI 02919",
    phone: "(401) 231-4000",
    website: "https://www.johnstonri.gov",
    hours: "Mon–Thu 7:00 AM – 3:30 PM, Fri 7:00 AM – 2:30 PM",
    description:
      "Handles road maintenance, sanitary sewer services, snow removal, and infrastructure for the Town of Johnston.",
  },
  {
    id: "johnston-municipal-court",
    name: "Johnston Municipal Court",
    category: "Municipal Services",
    address: "1600 Atwood Ave, Johnston, RI 02919",
    phone: "(401) 946-7150",
    website: "https://www.johnstonri.gov",
    hours: "Mon–Fri 8:30 AM – 4:30 PM",
    description:
      "Adjudicates state moving traffic violations and local ordinance offenses including parking, zoning, minimum housing code violations, and animal control matters.",
  },
  {
    id: "johnston-public-schools",
    name: "Johnston Public Schools — Central Office",
    category: "Municipal Services",
    address: "10 Memorial Ave, Johnston, RI 02919",
    phone: "(401) 233-1900",
    website: "https://www.johnstonschools.org",
    hours: "Mon–Fri 8:00 AM – 4:00 PM",
    description:
      "Administrative headquarters for Johnston Public Schools, overseeing all public schools in the district. Located within the Nicholas A. Ferri Middle School building.",
  },
  {
    id: "usps-johnston",
    name: "US Post Office — Johnston",
    category: "Municipal Services",
    address: "1530 Atwood Ave, Johnston, RI 02919",
    phone: "(401) 331-9367",
    hours: "Mon–Fri 8:00 AM – 5:00 PM, Sat 8:00 AM – 2:00 PM",
    description:
      "Full-service United States Postal Service office providing mail services, package shipping, PO boxes, and passport applications.",
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
    id: "johnston-child-care-center",
    name: "Johnston Child Care Center",
    category: "Childcare",
    address: "87 Putnam Pike, Johnston, RI 02919",
    phone: "(401) 233-3360",
    website: "https://www.johnstonchildcare.com",
    hours: "Mon–Fri 7:00 AM – 5:15 PM",
    description:
      "Licensed center established in 1996 serving children ages 6 weeks to 12 years. Offers infant/toddler care, preschool, extended care, and summer camp with a 5,000 sq ft outdoor playground.",
  },
  {
    id: "little-angels-academy",
    name: "Little Angels Academy Childcare Center",
    category: "Childcare",
    address: "415 Central Ave, Johnston, RI 02919",
    phone: "(401) 944-1285",
    website: "https://www.littleangelsri.net",
    hours: "Mon–Fri 7:30 AM – 5:00 PM",
    description:
      "Serves children ages 3 months to 5 years with infant, toddler, and preschool programs. Full-time, part-time, and occasional care available.",
  },
  {
    id: "creative-early-learning-center",
    name: "Creative Early Learning Center",
    category: "Childcare",
    address: "2952 Hartford Ave, Johnston, RI 02919",
    phone: "(401) 934-2807",
    website: "https://www.creativeelc.org",
    hours: "Mon–Fri 7:00 AM – 5:30 PM",
    description:
      "Childcare for ages 6 weeks to 5 years with a bilingual enrichment program introducing Spanish and Sign Language to children ages 3 to 5.",
  },
  {
    id: "strawberry-fields-early-learning",
    name: "Strawberry Fields Early Learning Academy",
    category: "Childcare",
    address: "700 Greenville Ave, Johnston, RI 02919",
    phone: "(401) 618-5384",
    website: "https://www.strawberryfieldsela.com",
    hours: "Mon–Fri 6:30 AM – 6:00 PM",
    description:
      "Private early learning academy serving children ages 6 months to 5 years in a nurturing environment.",
  },
  {
    id: "scribbles-academy",
    name: "Scribbles Academy",
    category: "Childcare",
    address: "678 Killingly St, Johnston, RI 02919",
    phone: "(401) 861-1616",
    hours: "Mon–Fri 6:30 AM – 6:30 PM",
    description:
      "NAEYC-accredited, 5-star BrightStars rated childcare center serving ages 6 weeks to 12 years. Established 1994 with a maximum capacity of 77 children.",
  },
  {
    id: "dreamland-learning-center",
    name: "Dreamland Learning Center",
    category: "Childcare",
    address: "1253 Hartford Ave, Johnston, RI 02919",
    phone: "(401) 280-1400",
    website: "https://dreamlandlearningcenter.com",
    hours: "Mon–Fri 6:30 AM – 6:00 PM",
    description:
      "Family-owned and operated facility serving children ages 6 weeks to 12 years. Part of a three-location operation across Rhode Island.",
  },
  {
    id: "over-the-rainbow-learning-center",
    name: "Over the Rainbow Learning Center",
    category: "Childcare",
    address: "1269 Plainfield St, Johnston, RI 02919",
    phone: "(401) 383-4664",
    website: "https://www.overtherainbowlearningcentersri.com",
    hours: "Mon–Fri 6:30 AM – 6:00 PM",
    description:
      "Established in 2006, serving children ages 12 months to 12 years. Two locations in Johnston and Providence.",
  },
  {
    id: "amazing-kids-academy",
    name: "Amazing Kids Academy",
    category: "Childcare",
    address: "2 Morgan Mill Rd, Johnston, RI 02919",
    phone: "(401) 383-1030",
    hours: "Mon–Fri 6:00 AM – 6:00 PM",
    description:
      "Licensed center-based childcare serving children ages 12 months to 12 years with a maximum capacity of 93 children. Established 2010.",
  },
  {
    id: "tots-town-child-care",
    name: "Tots' Town Child Care Center",
    category: "Childcare",
    address: "29 George Waterman Rd, Johnston, RI 02919",
    phone: "(401) 231-6886",
    website: "https://totstownchildcare.com",
    hours: "Mon–Fri 7:00 AM – 5:00 PM",
    description:
      "Serves children ages 18 months to 12 years with toddler care, preschool, and after-school programs for school-age children.",
  },
  {
    id: "the-schoolhouse-preschool",
    name: "The Schoolhouse Preschool",
    category: "Childcare",
    address: "350 Central Ave, Johnston, RI 02919",
    phone: "(401) 808-6243",
    hours: "Mon–Fri 7:00 AM – 5:30 PM",
    description:
      "Year-round preschool serving children ages 6 weeks to 5 years.",
  },
  {
    id: "the-farm-house-preschool",
    name: "The Farm House Preschool",
    category: "Childcare",
    address: "2320 Plainfield Pike, Johnston, RI 02919",
    phone: "(401) 432-7776",
    description:
      "Licensed DCYF center serving children ages 6 weeks to 6 years with infant, toddler, and preschool programs. Maximum capacity of 48 children.",
  },
  {
    id: "imagination-station-early-learning",
    name: "Imagination Station Early Learning Center",
    category: "Childcare",
    address: "47 Lincoln Dr, Johnston, RI 02919",
    phone: "(401) 861-5401",
    website: "https://imaginationstationri.com",
    hours: "Mon–Fri 6:30 AM – 5:30 PM",
    description:
      "Serves children ages 6 weeks to 12 years. Offers before/after school care, summer camps, and enrichment classes including yoga and cooking.",
  },
  {
    id: "growing-minds-preschool",
    name: "Growing Minds Preschool and Enrichment Center",
    category: "Childcare",
    address: "1535 Hartford Ave, Johnston, RI 02919",
    phone: "(401) 351-3230",
    website: "https://growingmindsri.org",
    description:
      "Early learning center for children ages 6 weeks to 5 years emphasizing high-quality inclusive practices for all children regardless of background or ability.",
  },
  {
    id: "tricounty-head-start-johnston",
    name: "TriCounty Head Start - Johnston",
    category: "Childcare",
    address: "7 Waveland St, Johnston, RI 02919",
    phone: "(401) 351-2750",
    website: "https://www.tricountyri.org",
    description:
      "Free Head Start and Early Head Start programs for pregnant women and children birth to age 5. DCYF-licensed and BrightStars rated. No cost to participate.",
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
