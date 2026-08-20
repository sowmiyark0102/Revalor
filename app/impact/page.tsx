"use client";

import { Sidebar, MobileTabBar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/ui/Card";
import { DemoBadge } from "@/components/ui/Badge";
import { DEMO_STATS, IMPACT_FACTORS } from "@/lib/demo-data";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const MONTHLY = [
  { month: "Mar", items: 1 },
  { month: "Apr", items: 2 },
  { month: "May", items: 1 },
  { month: "Jun", items: 3 },
  { month: "Jul", items: 4 },
  { month: "Aug", items: 2 },
];

const CATEGORY_SPLIT = [
  { name: "Laptops", value: 3, color: "#1B5E46" },
  { name: "Smartphones", value: 2, color: "#2C7A5C" },
  { name: "Cables", value: 4, color: "#B5622A" },
  { name: "Chargers", value: 2, color: "#D98A4F" },
  { name: "Other", value: 2, color: "#94A69B" },
];

const RECOVERY_HISTORY = [
  { month: "Mar", kg: 1.2 },
  { month: "Apr", kg: 3.6 },
  { month: "May", kg: 5.1 },
  { month: "Jun", kg: 9.4 },
  { month: "Jul", kg: 14.8 },
  { month: "Aug", kg: 18.4 },
];

export default function ImpactPage() {
  const stats = DEMO_STATS;
  const co2 = (stats.wasteDivertedKg * IMPACT_FACTORS.co2AvoidedPerKg).toFixed(1);
  const materials = (stats.wasteDivertedKg * IMPACT_FACTORS.materialsRecoveredRatio).toFixed(1);

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar />
      <div className="flex-1 pb-24 md:pb-0">
        <Topbar title="Impact" subtitle="Your estimated environmental contribution so far." />

        <div className="container-page py-8">
          <div className="mb-4 flex items-center gap-2">
            <span className="eyebrow">Impact estimates</span>
            <DemoBadge />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard label="Items recovered" value={stats.itemsRecovered.toString()} />
            <MetricCard label="Waste diverted" value={`${stats.wasteDivertedKg} kg`} />
            <MetricCard label="Est. material recovery" value={`${materials} kg`} />
            <MetricCard label="Est. CO₂ avoided" value={`${co2} kg`} />
          </div>

          <p className="mt-3 text-xs text-muted">
            Estimates use configurable impact factors (
            {IMPACT_FACTORS.co2AvoidedPerKg} kg CO₂e avoided per kg, {" "}
            {Math.round(IMPACT_FACTORS.materialsRecoveredRatio * 100)}% material recovery ratio)
            and are not third-party verified.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Card>
              <p className="font-display text-base font-semibold">Recovery history</p>
              <p className="text-xs text-muted">Cumulative kg diverted, by month</p>
              <div className="mt-4 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={RECOVERY_HISTORY}>
                    <CartesianGrid stroke="#DDE1D8" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#5C6B62" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#5C6B62" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #DDE1D8", fontSize: 12 }} />
                    <Line type="monotone" dataKey="kg" stroke="#1B5E46" strokeWidth={2.5} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <p className="font-display text-base font-semibold">Monthly activity</p>
              <p className="text-xs text-muted">Items scanned per month</p>
              <div className="mt-4 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MONTHLY}>
                    <CartesianGrid stroke="#DDE1D8" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#5C6B62" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#5C6B62" }} axisLine={false} tickLine={false} allowDecimals={false} />
                    <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #DDE1D8", fontSize: 12 }} />
                    <Bar dataKey="items" fill="#B5622A" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="lg:col-span-2">
              <p className="font-display text-base font-semibold">Waste category distribution</p>
              <p className="text-xs text-muted">Items recovered, by category</p>
              <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row">
                <div className="h-56 w-56 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={CATEGORY_SPLIT} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                        {CATEGORY_SPLIT.map((c) => (
                          <Cell key={c.name} fill={c.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #DDE1D8", fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <ul className="grid flex-1 grid-cols-2 gap-x-6 gap-y-3">
                  {CATEGORY_SPLIT.map((c) => (
                    <li key={c.name} className="flex items-center gap-2 text-sm">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                      {c.name}
                      <span className="ml-auto font-mono text-xs text-muted">{c.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <MobileTabBar />
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <p className="font-display text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </Card>
  );
}
