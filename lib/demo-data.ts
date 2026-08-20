import type {
  RecyclerPartner,
  CollectionRequestRecord,
  DashboardStats,
  ActivityItem,
  Badge,
  Campaign,
} from "@/types";

// All data in this file is clearly-labeled DEMO data used so the product
// can be presented end-to-end without a live database or partner network.
// Every place this is rendered, the UI marks it with a "Demo data" badge.

export const isDemoMode = () => process.env.NEXT_PUBLIC_MAPS_PROVIDER !== "google" &&
  process.env.NEXT_PUBLIC_MAPS_PROVIDER !== "osm";

export const DEMO_STATS: DashboardStats = {
  itemsRecovered: 7,
  wasteDivertedKg: 18.4,
  estRecoveryValueMin: 210000,
  estRecoveryValueMax: 480000,
  impactScore: 642,
};

export const DEMO_ACTIVITY: ActivityItem[] = [
  { id: "a1", text: "Laptop submitted for collection", timestamp: "2026-08-09T10:12:00Z" },
  { id: "a2", text: "Old charger classified as reusable", timestamp: "2026-08-07T15:40:00Z" },
  { id: "a3", text: "Collection request #RVL-1042 completed", timestamp: "2026-08-04T09:05:00Z" },
  { id: "a4", text: "Cable bundle scanned — recommended for recycling", timestamp: "2026-08-01T18:22:00Z" },
];

export const DEMO_RECYCLERS: RecyclerPartner[] = [
  {
    id: "rp1",
    name: "GreenCircuit E-Waste Collective",
    status: "VERIFIED",
    distanceKm: 1.8,
    address: "12 Anna Nagar Main Rd, Chennai",
    acceptedTypes: ["Laptops", "Smartphones", "Cables", "Computer components"],
    pickupAvailable: true,
    dropoffAvailable: true,
    operatingHours: "Mon–Sat, 9:00 AM – 6:30 PM",
    rating: 4.6,
    lat: 13.0850,
    lng: 80.2101,
    isDemo: true,
  },
  {
    id: "rp2",
    name: "Second Life Electronics",
    status: "VERIFIED",
    distanceKm: 3.2,
    address: "45 T Nagar High Rd, Chennai",
    acceptedTypes: ["Smartphones", "Tablets", "Chargers", "Keyboards"],
    pickupAvailable: false,
    dropoffAvailable: true,
    operatingHours: "Daily, 10:00 AM – 8:00 PM",
    rating: 4.3,
    lat: 13.0418,
    lng: 80.2341,
    isDemo: true,
  },
  {
    id: "rp3",
    name: "Chennai Metro Recyclers",
    status: "VERIFIED",
    distanceKm: 5.6,
    address: "8 Guindy Industrial Estate, Chennai",
    acceptedTypes: ["Laptops", "Computer components", "Small appliances"],
    pickupAvailable: true,
    dropoffAvailable: true,
    operatingHours: "Mon–Fri, 8:30 AM – 5:30 PM",
    rating: 4.1,
    lat: 13.0067,
    lng: 80.2206,
    isDemo: true,
  },
  {
    id: "rp4",
    name: "Urban Reclaim Co-op",
    status: "PENDING",
    distanceKm: 7.1,
    address: "21 Velachery Bypass, Chennai",
    acceptedTypes: ["Cables", "Chargers", "Keyboards"],
    pickupAvailable: false,
    dropoffAvailable: true,
    operatingHours: "Tue–Sun, 11:00 AM – 7:00 PM",
    rating: null,
    lat: 12.9756,
    lng: 80.2200,
    isDemo: true,
  },
];

export const DEMO_COLLECTION_REQUESTS: CollectionRequestRecord[] = [
  {
    id: "RVL-1042",
    itemName: "Laptop (partially working)",
    quantity: 1,
    pickupAddress: "Flat 3B, Lakeview Apartments, Chennai",
    preferredDate: "2026-08-04",
    preferredTime: "Morning (9–12)",
    status: "RECOVERED",
    createdAt: "2026-07-30T08:00:00Z",
  },
  {
    id: "RVL-1058",
    itemName: "Cable bundle",
    quantity: 3,
    pickupAddress: "Flat 3B, Lakeview Apartments, Chennai",
    preferredDate: "2026-08-14",
    preferredTime: "Evening (4–7)",
    status: "COLLECTOR_ASSIGNED",
    createdAt: "2026-08-09T11:00:00Z",
  },
];

export const DEMO_BADGES: Badge[] = [
  { code: "FIRST_RECOVERY", title: "First Recovery", description: "Completed your first waste recovery.", earned: true, earnedAt: "2026-06-12T00:00:00Z" },
  { code: "EWASTE_HERO", title: "E-Waste Hero", description: "Recovered 5+ kg of e-waste.", earned: true, earnedAt: "2026-07-20T00:00:00Z" },
  { code: "FIVE_ITEMS", title: "5 Items Recovered", description: "Successfully recovered 5 items.", earned: false },
  { code: "COMMUNITY", title: "Community Contributor", description: "Joined an organization campaign.", earned: false },
];

export const DEMO_CAMPAIGN: Campaign = {
  id: "camp1",
  title: "Campus E-Waste Drive",
  targetKg: 100,
  collectedKg: 72,
  participants: 184,
  daysLeft: 6,
};

// Impact calculation factors — mirrors the ImpactFactor Prisma model so
// admins can tune these without code changes in production.
export const IMPACT_FACTORS = {
  co2AvoidedPerKg: 1.8, // kg CO2e avoided per kg of e-waste properly recovered (estimate)
  materialsRecoveredRatio: 0.62, // fraction of item weight recoverable as raw material (estimate)
};
