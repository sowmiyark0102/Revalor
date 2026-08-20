"use client";

import { useState } from "react";
import { Sidebar, MobileTabBar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/Badge";
import { DEMO_COLLECTION_REQUESTS } from "@/lib/demo-data";
import { STATUS_LABELS, formatDate, cn } from "@/lib/utils";
import { CheckCircle2, Circle, Truck, PackageCheck } from "lucide-react";

const STAGES = ["REQUESTED", "CONFIRMED", "COLLECTOR_ASSIGNED", "PICKED_UP", "PROCESSING", "RECOVERED"];

export default function PickupPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar />
      <div className="flex-1 pb-24 md:pb-0">
        <Topbar title="Collections" subtitle="Request a pickup and track its status." />

        <div className="container-page grid gap-6 py-8 lg:grid-cols-2">
          <div>
            <span className="eyebrow">New pickup request</span>
            <Card className="mt-3">
              {submitted ? (
                <div className="flex flex-col items-center gap-3 py-8 text-center">
                  <PackageCheck className="h-8 w-8 text-pine" />
                  <p className="font-medium">Pickup request submitted</p>
                  <p className="max-w-xs text-sm text-muted">
                    You'll get a notification once a collector confirms your slot.
                  </p>
                  <Button variant="secondary" size="sm" onClick={() => setSubmitted(false)}>
                    Submit another
                  </Button>
                </div>
              ) : (
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <Field label="Item" placeholder="e.g. Laptop, cable bundle" required />
                  <Field label="Quantity" type="number" defaultValue="1" required />
                  <Field label="Pickup address" placeholder="Flat, street, area, city" required />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Preferred date" type="date" required />
                    <div>
                      <label className="text-sm font-medium">Preferred time</label>
                      <select className="mt-1.5 w-full rounded-lg border border-border px-3.5 py-2.5 text-sm outline-none focus:border-pine">
                        <option>Morning (9–12)</option>
                        <option>Afternoon (12–4)</option>
                        <option>Evening (4–7)</option>
                      </select>
                    </div>
                  </div>
                  <Field label="Contact number" placeholder="+91 90000 00000" required />
                  <div>
                    <label className="text-sm font-medium">Notes (optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Gate code, landmark, or handling notes"
                      className="mt-1.5 w-full rounded-lg border border-border px-3.5 py-2.5 text-sm outline-none focus:border-pine"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Submit pickup request
                  </Button>
                </form>
              )}
            </Card>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="eyebrow">Tracking</span>
              <DemoBadge />
            </div>
            <Card className="mt-3">
              <p className="font-display text-base font-semibold">
                {DEMO_COLLECTION_REQUESTS[1].itemName}
              </p>
              <p className="mt-1 font-mono text-xs text-muted">#{DEMO_COLLECTION_REQUESTS[1].id}</p>

              <div className="mt-6 space-y-0">
                {STAGES.map((stage, i) => {
                  const currentIdx = STAGES.indexOf(DEMO_COLLECTION_REQUESTS[1].status);
                  const done = i <= currentIdx;
                  const isLast = i === STAGES.length - 1;
                  return (
                    <div key={stage} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        {done ? (
                          <CheckCircle2 className="h-5 w-5 text-pine" />
                        ) : (
                          <Circle className="h-5 w-5 text-border" />
                        )}
                        {!isLast && (
                          <div className={cn("mt-0.5 w-px flex-1", done ? "bg-pine" : "bg-border")} style={{ minHeight: 28 }} />
                        )}
                      </div>
                      <p className={cn("pb-7 text-sm", done ? "font-medium text-ink" : "text-muted")}>
                        {STATUS_LABELS[stage]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="mt-4 flex items-center gap-3">
              <Truck className="h-5 w-5 text-copper" />
              <p className="text-sm text-muted">
                Collector assigned for {formatDate(DEMO_COLLECTION_REQUESTS[1].preferredDate)},{" "}
                {DEMO_COLLECTION_REQUESTS[1].preferredTime}.
              </p>
            </Card>
          </div>
        </div>
      </div>
      <MobileTabBar />
    </div>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        {...props}
        className="mt-1.5 w-full rounded-lg border border-border px-3.5 py-2.5 text-sm outline-none focus:border-pine"
      />
    </div>
  );
}
