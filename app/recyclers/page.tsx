"use client";

import { useMemo, useState } from "react";
import { Sidebar, MobileTabBar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/ui/Card";
import { Badge, DemoBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DEMO_RECYCLERS } from "@/lib/demo-data";
import { cn } from "@/lib/utils";
import { MapPin, Star, ShieldCheck, Truck, Store, Clock, Search } from "lucide-react";

const WASTE_TYPES = ["All types", "Laptops", "Smartphones", "Tablets", "Cables", "Chargers", "Keyboards", "Computer components"];

export default function RecyclersPage() {
  const [wasteType, setWasteType] = useState("All types");
  const [pickupOnly, setPickupOnly] = useState(false);
  const [dropoffOnly, setDropoffOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [selected, setSelected] = useState(DEMO_RECYCLERS[0]?.id);

  const filtered = useMemo(() => {
    return DEMO_RECYCLERS.filter((r) => {
      if (wasteType !== "All types" && !r.acceptedTypes.includes(wasteType)) return false;
      if (pickupOnly && !r.pickupAvailable) return false;
      if (dropoffOnly && !r.dropoffAvailable) return false;
      if (verifiedOnly && r.status !== "VERIFIED") return false;
      return true;
    }).sort((a, b) => a.distanceKm - b.distanceKm);
  }, [wasteType, pickupOnly, dropoffOnly, verifiedOnly]);

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar />
      <div className="flex-1 pb-24 md:pb-0">
        <Topbar title="Find a recycler" subtitle="Verified partners near you for pickup or drop-off." />

        <div className="container-page py-8">
          <div className="mb-4 flex items-center gap-2">
            <span className="eyebrow">Partner network</span>
            <DemoBadge />
          </div>

          {/* Filters */}
          <Card className="mb-6 flex flex-wrap items-center gap-3 p-4">
            <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
              <Search className="h-4 w-4 text-muted" />
              <select
                value={wasteType}
                onChange={(e) => setWasteType(e.target.value)}
                className="bg-transparent text-sm outline-none"
              >
                {WASTE_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <FilterToggle label="Pickup available" active={pickupOnly} onClick={() => setPickupOnly((v) => !v)} icon={Truck} />
            <FilterToggle label="Drop-off available" active={dropoffOnly} onClick={() => setDropoffOnly((v) => !v)} icon={Store} />
            <FilterToggle label="Verified only" active={verifiedOnly} onClick={() => setVerifiedOnly((v) => !v)} icon={ShieldCheck} />
          </Card>

          <div className="grid gap-6 lg:grid-cols-5">
            {/* List */}
            <div className="space-y-4 lg:col-span-2">
              {filtered.length === 0 && (
                <Card className="py-12 text-center text-sm text-muted">
                  No recyclers match these filters yet. Try widening your search.
                </Card>
              )}
              {filtered.map((r) => (
                <Card
                  key={r.id}
                  onClick={() => setSelected(r.id)}
                  className={cn(
                    "cursor-pointer transition-colors",
                    selected === r.id && "border-pine ring-1 ring-pine/30"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-base font-semibold">{r.name}</p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                        <MapPin className="h-3.5 w-3.5" />
                        {r.distanceKm} km away
                      </p>
                    </div>
                    {r.status === "VERIFIED" ? (
                      <Badge tone="pine">
                        <ShieldCheck className="h-3 w-3" /> Verified
                      </Badge>
                    ) : (
                      <Badge tone="pending">Pending review</Badge>
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {r.acceptedTypes.slice(0, 4).map((t) => (
                      <Badge key={t} tone="neutral">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {r.operatingHours}
                    </span>
                    {r.rating ? (
                      <span className="flex items-center gap-1 text-ink">
                        <Star className="h-3.5 w-3.5 fill-copper text-copper" /> {r.rating}
                      </span>
                    ) : (
                      <span>No ratings yet</span>
                    )}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button variant="secondary" size="sm" className="flex-1">
                      View details
                    </Button>
                    <Button href="/pickup" size="sm" className="flex-1" disabled={!r.pickupAvailable}>
                      Request pickup
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Map */}
            <div className="lg:col-span-3">
              <DemoMap recyclers={filtered} selected={selected} onSelect={setSelected} />
            </div>
          </div>
        </div>
      </div>
      <MobileTabBar />
    </div>
  );
}

function FilterToggle({
  label,
  active,
  onClick,
  icon: Icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon: any;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-colors",
        active ? "border-pine bg-pine/10 text-pine" : "border-border text-muted hover:text-ink"
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function DemoMap({
  recyclers,
  selected,
  onSelect,
}: {
  recyclers: typeof DEMO_RECYCLERS;
  selected?: string;
  onSelect: (id: string) => void;
}) {
  if (recyclers.length === 0) {
    return (
      <Card className="flex h-full min-h-[420px] items-center justify-center text-sm text-muted">
        No recyclers to display.
      </Card>
    );
  }

  const lats = recyclers.map((r) => r.lat);
  const lngs = recyclers.map((r) => r.lng);
  const [minLat, maxLat] = [Math.min(...lats), Math.max(...lats)];
  const [minLng, maxLng] = [Math.min(...lngs), Math.max(...lngs)];
  const pad = 0.01;

  function project(lat: number, lng: number) {
    const x = ((lng - (minLng - pad)) / (maxLng - minLng + pad * 2)) * 100;
    const y = 100 - ((lat - (minLat - pad)) / (maxLat - minLat + pad * 2)) * 100;
    return { x, y };
  }

  return (
    <Card className="relative h-full min-h-[420px] overflow-hidden p-0">
      <div className="absolute left-4 top-4 z-10">
        <span className="demo-tag">Demo map — connect Google Maps or OSM in production</span>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,32,26,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(18,32,26,0.05)_1px,transparent_1px)] bg-[size:28px_28px] bg-paper-alt" />
      {recyclers.map((r) => {
        const { x, y } = project(r.lat, r.lng);
        const active = selected === r.id;
        return (
          <button
            key={r.id}
            onClick={() => onSelect(r.id)}
            style={{ left: `${x}%`, top: `${y}%` }}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-full transition-transform",
              active && "scale-110"
            )}
          >
            <MapPin
              className={cn("h-8 w-8 drop-shadow", active ? "fill-copper text-copper-dark" : "fill-pine text-pine-dark")}
              strokeWidth={1.5}
            />
          </button>
        );
      })}
    </Card>
  );
}
