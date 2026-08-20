import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatINR(paise: number | null): string {
  if (paise === null) return "—";
  const rupees = paise / 100;
  return `₹${rupees.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

export function formatValueRange(min: number | null, max: number | null): string {
  if (min === null && max === null) return "No resale value expected";
  if (min === 0 && max === 0) return "No resale value expected";
  return `${formatINR(min)} – ${formatINR(max)}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? "s" : ""} ago`;
}

export const ACTION_LABELS: Record<string, string> = {
  REPAIR: "Repair",
  REUSE: "Reuse / Donate",
  RESELL: "Resell",
  RECYCLE: "Recycle",
  SAFE_DISPOSAL: "Safe disposal",
};

export const CONDITION_LABELS: Record<string, string> = {
  WORKING: "Working",
  PARTIALLY_WORKING: "Partially working",
  NON_FUNCTIONAL: "Non-functional",
  UNKNOWN: "Unknown",
};

export const STATUS_LABELS: Record<string, string> = {
  REQUESTED: "Requested",
  CONFIRMED: "Confirmed",
  COLLECTOR_ASSIGNED: "Collector assigned",
  PICKED_UP: "Picked up",
  PROCESSING: "Processing",
  RECOVERED: "Recovered",
  CANCELLED: "Cancelled",
};
