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
  "Restaurants",
] as const;

export type Category = (typeof categories)[number];
