# Johnston Community Directory

**A free, open resource connecting Johnston, RI residents with the local services they need.**

Johnston is a town of roughly 30,000 people — good people who look out for each other. But when someone needs to find a food pantry, affordable childcare, or the right office at Town Hall, they're stuck piecing together information from outdated Google results, Facebook groups, and word of mouth. The resources exist. They're just scattered and hard to find.

The Johnston Community Directory brings them together in one place — simple, accurate, and free for everyone.

## What You'll Find

The directory focuses first on the services that matter most:

- **Food Assistance** — food banks, pantries, and emergency food programs
- **Healthcare** — clinics, dental care, and health services
- **Childcare** — daycare, after-school programs, and family resources
- **Senior Services** — programs, meals, transportation, and social activities
- **Mental Health** — counseling, substance abuse resources, and crisis support
- **Municipal Services** — Town Hall, libraries, schools, parks, and public works
- **Shelters** — housing assistance and emergency shelter

Every listing is researched and verified by hand. Accuracy matters more than volume — if it's in the directory, you can trust it.

## Why This Exists

Too much of getting help in Johnston depends on knowing the right person or being in the right group. This directory is a small step toward changing that. When someone needs something, they should be able to find it — easily, reliably, and without jumping through hoops.

This project was built by a neighbor who lives here and sees the gaps firsthand. It's not run by a company or a government office. It's a community resource, built for the community.

## Roadmap

This is just the beginning. Here's where things are headed:

1. **Curated Launch** (current) — A verified, hand-curated set of essential service listings
2. **Community Input** — Open up submissions so residents can suggest new listings or flag outdated information
3. **Sustainable Growth** — Let local businesses claim and enhance their profiles, creating a path to keep the directory free forever

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v22 or later recommended)

### Installation

```bash
git clone https://github.com/mastapegs/johnston-town-site.git
cd johnston-town-site
npm install
```

### Development

```bash
npm run dev          # Start the local dev server
npm run build        # Build for production
npm run preview      # Preview the production build
npm run lint         # Run the linter
npm run format       # Format code with Prettier
npm run geocode      # Resolve listing addresses to map coordinates
```

### Maps & Geocoding

Each listing includes an interactive map powered by OpenStreetMap. Addresses are the source of truth — when you add or change a listing address, run `npm run geocode` to automatically resolve it to precise map coordinates using the free Nominatim API (no API key needed). Results are cached, so only changed addresses are re-geocoded.

## Built With

- [React](https://react.dev/) — UI framework
- [React Router](https://reactrouter.com/) — Client-side routing
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [Vite](https://vite.dev/) — Build tool and dev server
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [OpenStreetMap](https://www.openstreetmap.org/) — Maps and geocoding

## Contributing

This project is open to contributions from anyone who wants to help make Johnston a little easier to navigate. Whether you're a developer, a resident who knows about a service that should be listed, or just someone who wants to lend a hand — you're welcome here.

If you'd like to contribute code, fork the repo, create a branch, and open a pull request. If you'd like to suggest a listing or report an issue, [open an issue](https://github.com/mastapegs/johnston-town-site/issues) and let us know.

## License

This project is open source and available to the community.

---

_Built with care for Johnston, Rhode Island._
