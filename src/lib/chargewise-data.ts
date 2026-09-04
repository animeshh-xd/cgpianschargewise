/**
 * Centralized ChargeWise prototype mock data.
 * All values are simulated for the Phase 1 frontend prototype — no live APIs.
 */

export type Availability = "Available" | "Limited" | "Busy";

export type Station = {
  id: string;
  name: string;
  location: string;
  distanceKm: number;
  waitMinutes: number;
  pricePerKwh: number;
  connector: string;
  availability: Availability;
  estimatedCost: number;
  score: number;
  /** Percentage coordinates inside the mock map viewport. */
  x: number;
  y: number;
  latitude: number;
  longitude: number;
  recommended?: boolean;
};

export const stations: Station[] = [
  {
    id: "tata-power-rajouri-garden",
    name: "Tata Power",
    location: "Rajouri Garden",
    distanceKm: 2.4,
    waitMinutes: 8,
    pricePerKwh: 13,
    connector: "CCS2",
    availability: "Available",
    estimatedCost: 286,
    score: 91,
    x: 36,
    y: 30,
    latitude: 28.6469,
    longitude: 77.1200,
    recommended: true,
  },
  {
    id: "statiq-patel-nagar",
    name: "Statiq",
    location: "Patel Nagar",
    distanceKm: 1.2,
    waitMinutes: 27,
    pricePerKwh: 12,
    connector: "CCS2",
    availability: "Busy",
    estimatedCost: 250,
    score: 64,
    x: 62,
    y: 52,
    latitude: 28.6560,
    longitude: 77.1680,
  },
  {
    id: "jio-bp-kirti-nagar",
    name: "Jio-bp",
    location: "Kirti Nagar",
    distanceKm: 3.1,
    waitMinutes: 5,
    pricePerKwh: 15,
    connector: "CCS2",
    availability: "Available",
    estimatedCost: 310,
    score: 83,
    x: 22,
    y: 62,
    latitude: 28.6519,
    longitude: 77.1449,
  },
  {
    id: "chargezone-punjabi-bagh",
    name: "ChargeZone",
    location: "Punjabi Bagh",
    distanceKm: 2.8,
    waitMinutes: 11,
    pricePerKwh: 12.5,
    connector: "Type 2",
    availability: "Limited",
    estimatedCost: 265,
    score: 78,
    x: 48,
    y: 16,
    latitude: 28.6689,
    longitude: 77.1310,
  },
  {
    id: "fortum-connaught-place",
    name: "Fortum",
    location: "Connaught Place",
    distanceKm: 5.6,
    waitMinutes: 14,
    pricePerKwh: 16,
    connector: "CHAdeMO",
    availability: "Limited",
    estimatedCost: 332,
    score: 61,
    x: 78,
    y: 26,
    latitude: 28.6315,
    longitude: 77.2167,
  },
];

export const recommendedStation: Station = stations[0]!;
export const nearestStation: Station = stations[1]!;

export type Alternative = {
  id: string;
  label: string;
  stationId: string;
  note: string;
};

export const alternatives: Alternative[] = [
  { id: "nearest", label: "Nearest", stationId: "statiq-patel-nagar", note: "Closest, but longest queue" },
  { id: "fastest", label: "Fastest", stationId: "jio-bp-kirti-nagar", note: "Shortest wait, higher price" },
  { id: "best-value", label: "Best Value", stationId: "chargezone-punjabi-bagh", note: "Cheap, but connector mismatch" },
];

export const scoreBreakdown = [
  { label: "Waiting time", value: 100, rating: "Excellent" },
  { label: "Distance", value: 80, rating: "Good" },
  { label: "Cost", value: 80, rating: "Good" },
  { label: "Compatibility", value: 100, rating: "Excellent" },
  { label: "Availability", value: 100, rating: "Excellent" },
] as const;

export const estimates = {
  arrival: "7:18 PM",
  predictedWait: "8 min",
  chargingTime: "28 min",
  totalTime: "36 min",
  chargingCost: "₹286",
} as const;

export const timeSlots = ["6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"] as const;
export const dateOptions = ["Today", "Tomorrow"] as const;

export const chargingSession = {
  energyDelivered: "32.4 kWh",
  estimatedCost: "₹421",
  timeRemaining: "21 min",
  chargingSpeed: "120 kW",
  slot: "Slot #3",
} as const;

export const availabilityTone: Record<Availability, string> = {
  Available: "text-primary",
  Limited: "text-amber-400",
  Busy: "text-destructive",
};

export function getStation(id: string): Station | undefined {
  return stations.find((s) => s.id === id);
}
