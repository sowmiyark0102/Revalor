export type Condition = "WORKING" | "PARTIALLY_WORKING" | "NON_FUNCTIONAL" | "UNKNOWN";

export type RecommendedAction = "REPAIR" | "REUSE" | "RESELL" | "RECYCLE" | "SAFE_DISPOSAL";

export type CollectionStatus =
  | "REQUESTED"
  | "CONFIRMED"
  | "COLLECTOR_ASSIGNED"
  | "PICKED_UP"
  | "PROCESSING"
  | "RECOVERED"
  | "CANCELLED";

export interface ScanResult {
  id: string;
  detectedLabel: string;
  confidence: number; // 0-1
  category: string;
  materials: string[];
  condition: Condition;
  recommendedAction: RecommendedAction;
  estValueMin: number | null;
  estValueMax: number | null;
  aiProvider: "demo" | "anthropic" | "openai";
  isDemo: boolean;
  createdAt: string;
}

export interface RecyclerPartner {
  id: string;
  name: string;
  status: "PENDING" | "VERIFIED" | "REJECTED" | "SUSPENDED";
  distanceKm: number;
  address: string;
  acceptedTypes: string[];
  pickupAvailable: boolean;
  dropoffAvailable: boolean;
  operatingHours: string;
  rating: number | null;
  lat: number;
  lng: number;
  isDemo: boolean;
}

export interface CollectionRequestRecord {
  id: string;
  itemName: string;
  quantity: number;
  pickupAddress: string;
  preferredDate: string;
  preferredTime: string;
  status: CollectionStatus;
  createdAt: string;
}

export interface RecoveryStage {
  stage: "Collection" | "Sorting" | "Processing" | "Material Recovery" | "Final Outcome";
  completed: boolean;
  note?: string;
  recoveredMaterials?: string[];
  verifiedByPartner?: boolean;
}

export interface DashboardStats {
  itemsRecovered: number;
  wasteDivertedKg: number;
  estRecoveryValueMin: number;
  estRecoveryValueMax: number;
  impactScore: number;
}

export interface ActivityItem {
  id: string;
  text: string;
  timestamp: string;
}

export interface Badge {
  code: string;
  title: string;
  description: string;
  earned: boolean;
  earnedAt?: string;
}

export interface Campaign {
  id: string;
  title: string;
  targetKg: number;
  collectedKg: number;
  participants: number;
  daysLeft: number;
}
