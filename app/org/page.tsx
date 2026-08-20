"use client";

import { useState } from "react";
import { Sidebar, MobileTabBar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/Badge";
import { DEMO_CAMPAIGN } from "@/lib/demo-data";
import { Download, Plus, Users, Package, Leaf } from "lucide-react";

export default function OrgDashboardPage() {
  const [showForm, setShowForm] = useState(false);
  const campaign = DEMO_CAMPAIGN;

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar />
      <div className="flex-1 pb-24 md:pb-0">
        <Topbar title="Organization" subtitle="Collection campaigns and sustainability reporting." />

        <div className="container-page py-8">
          <div className="mb-4 flex items-center gap-2">
            <span className="eyebrow">Chennai Institute of Technology</span>
            <DemoBadge />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="flex items-center gap-4">
              <Package className="h-6 w-6 text-pine" />
              <div>
                <p className="font-display text-xl font-semibold">72 kg</p>
                <p className="text-xs text-muted">Waste collected</p>
              </div>
            </Card>
            <Card className="flex items-center gap-4">
              <Users className="h-6 w-6 text-pine" />
              <div>
                <p className="font-display text-xl font-semibold">184</p>
                <p className="text-xs text-muted">Participants</p>
              </div>
            </Card>
            <Card className="flex items-center gap-4">
              <Leaf className="h-6 w-6 text-pine" />
              <div>
                <p className="font-display text-xl font-semibold">129.6 kg</p>
                <p className="text-xs text-muted">Est. CO₂ avoided</p>
              </div>
            </Card>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <p className="eyebrow">Campaigns</p>
            <Button size="sm" onClick={() => setShowForm((v) => !v)}>
              <Plus className="h-4 w-4" />
              New campaign
            </Button>
          </div>

          {showForm && (
            <Card className="mt-4">
              <form className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium">Campaign title</label>
                  <input
                    placeholder="e.g. Diwali E-Waste Drive"
                    className="mt-1.5 w-full rounded-lg border border-border px-3.5 py-2.5 text-sm outline-none focus:border-pine"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Target (kg)</label>
                  <input
                    type="number"
                    placeholder="100"
                    className="mt-1.5 w-full rounded-lg border border-border px-3.5 py-2.5 text-sm outline-none focus:border-pine"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">End date</label>
                  <input
                    type="date"
                    className="mt-1.5 w-full rounded-lg border border-border px-3.5 py-2.5 text-sm outline-none focus:border-pine"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" onClick={(e: any) => e.preventDefault()}>
                    Create campaign
                  </Button>
                </div>
              </form>
            </Card>
          )}

          <Card className="mt-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display text-lg font-semibold">{campaign.title}</p>
                <p className="mt-1 text-sm text-muted">{campaign.daysLeft} days remaining</p>
              </div>
              <Button variant="secondary" size="sm">
                <Download className="h-4 w-4" />
                Export report
              </Button>
            </div>
            <div className="mt-5">
              <div className="flex items-baseline justify-between font-mono text-sm">
                <span>{campaign.collectedKg} kg collected</span>
                <span className="text-muted">of {campaign.targetKg} kg target</span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-paper-alt">
                <div
                  className="h-full rounded-full bg-pine"
                  style={{ width: `${Math.min(100, (campaign.collectedKg / campaign.targetKg) * 100)}%` }}
                />
              </div>
            </div>
            <p className="mt-3 text-sm text-muted">{campaign.participants} participants so far</p>
          </Card>
        </div>
      </div>
      <MobileTabBar />
    </div>
  );
}
