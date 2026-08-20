"use client";

import { useState } from "react";
import { Sidebar, MobileTabBar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge, DemoBadge } from "@/components/ui/Badge";
import { DEMO_RECYCLERS } from "@/lib/demo-data";
import { cn } from "@/lib/utils";
import { Check, X, Users, Recycle, ScanLine, Truck, Settings2 } from "lucide-react";

const TABS = [
  { key: "partners", label: "Recycler partners", icon: Recycle },
  { key: "users", label: "Users", icon: Users },
  { key: "categories", label: "Categories", icon: Settings2 },
  { key: "factors", label: "Impact factors", icon: Truck },
] as const;

export default function AdminPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("partners");
  const [partners, setPartners] = useState(DEMO_RECYCLERS);

  function setStatus(id: string, status: "VERIFIED" | "REJECTED") {
    setPartners((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  }

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar />
      <div className="flex-1 pb-24 md:pb-0">
        <Topbar title="Admin" subtitle="Platform-wide management and configuration." />

        <div className="container-page py-8">
          <div className="mb-4 flex items-center gap-2">
            <span className="eyebrow">Platform admin</span>
            <DemoBadge />
          </div>

          <div className="flex flex-wrap gap-2 border-b border-border pb-4">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  tab === t.key ? "bg-pine text-white" : "border border-border text-muted hover:text-ink"
                )}
              >
                <t.icon className="h-3.5 w-3.5" />
                {t.label}
              </button>
            ))}
          </div>

          {tab === "partners" && (
            <Card className="mt-6 divide-y divide-border p-0">
              {partners.map((p) => (
                <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <div>
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="mt-0.5 text-xs text-muted">{p.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge tone={p.status === "VERIFIED" ? "pine" : p.status === "REJECTED" ? "neutral" : "pending"}>
                      {p.status}
                    </Badge>
                    {p.status === "PENDING" && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" onClick={() => setStatus(p.id, "REJECTED")}>
                          <X className="h-3.5 w-3.5" /> Reject
                        </Button>
                        <Button size="sm" onClick={() => setStatus(p.id, "VERIFIED")}>
                          <Check className="h-3.5 w-3.5" /> Approve
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </Card>
          )}

          {tab === "users" && (
            <Card className="mt-6 divide-y divide-border p-0">
              {[
                { name: "Demo User", role: "USER", email: "demo.user@revalor.app" },
                { name: "Priya Recycler", role: "RECYCLER", email: "priya@greencircuit.example" },
                { name: "CIT Sustainability Cell", role: "ORG_ADMIN", email: "sustain@cit.example" },
              ].map((u) => (
                <div key={u.email} className="flex items-center justify-between gap-3 p-5">
                  <div>
                    <p className="text-sm font-medium">{u.name}</p>
                    <p className="mt-0.5 text-xs text-muted">{u.email}</p>
                  </div>
                  <Badge tone="neutral">{u.role}</Badge>
                </div>
              ))}
            </Card>
          )}

          {tab === "categories" && (
            <Card className="mt-6 divide-y divide-border p-0">
              {["Smartphones", "Laptops", "Tablets", "Chargers", "Cables", "Keyboards", "Computer components", "Small appliances"].map(
                (c) => (
                  <div key={c} className="flex items-center justify-between gap-3 p-5">
                    <p className="flex items-center gap-2 text-sm font-medium">
                      <ScanLine className="h-4 w-4 text-pine" /> {c}
                    </p>
                    <span className="text-xs text-muted">E-Waste</span>
                  </div>
                )
              )}
            </Card>
          )}

          {tab === "factors" && (
            <Card className="mt-6 divide-y divide-border p-0">
              {[
                { label: "CO₂ avoided per kg recovered", value: "1.8 kg CO₂e / kg" },
                { label: "Material recovery ratio", value: "62%" },
                { label: "Points per verified scan", value: "10 pts" },
                { label: "Points per completed collection", value: "60 pts" },
              ].map((f) => (
                <div key={f.label} className="flex items-center justify-between gap-3 p-5">
                  <p className="text-sm font-medium">{f.label}</p>
                  <input
                    defaultValue={f.value}
                    className="w-40 rounded-lg border border-border px-3 py-1.5 text-right font-mono text-sm outline-none focus:border-pine"
                  />
                </div>
              ))}
              <div className="p-5">
                <Button size="sm">Save changes</Button>
              </div>
            </Card>
          )}
        </div>
      </div>
      <MobileTabBar />
    </div>
  );
}
