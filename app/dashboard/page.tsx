import { Sidebar, MobileTabBar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/ui/Card";
import { DemoBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DEMO_STATS, DEMO_ACTIVITY } from "@/lib/demo-data";
import { formatValueRange, formatRelativeTime } from "@/lib/utils";
import { Package, Leaf, Wallet, Gauge, ScanLine, ArrowUpRight } from "lucide-react";

export default function DashboardPage() {
  const stats = DEMO_STATS;

  const cards = [
    {
      label: "Items recovered",
      value: stats.itemsRecovered.toString(),
      icon: Package,
    },
    {
      label: "Waste diverted",
      value: `${stats.wasteDivertedKg} kg`,
      icon: Leaf,
    },
    {
      label: "Estimated recovery value",
      value: formatValueRange(stats.estRecoveryValueMin, stats.estRecoveryValueMax),
      icon: Wallet,
    },
    {
      label: "Impact score",
      value: stats.impactScore.toString(),
      icon: Gauge,
    },
  ];

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar />
      <div className="flex-1 pb-20 md:pb-0">
        <Topbar title="Overview" subtitle="Welcome back — here's what's happening with your recoveries." />

        <div className="container-page py-8">
          <div className="mb-3 flex items-center gap-2">
            <span className="eyebrow">Your stats</span>
            <DemoBadge />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c) => (
              <Card key={c.label} className="flex flex-col gap-4">
                <c.icon className="h-5 w-5 text-pine" strokeWidth={1.7} />
                <div>
                  <p className="font-display text-2xl font-semibold">{c.value}</p>
                  <p className="mt-1 text-sm text-muted">{c.label}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold">Recent activity</h2>
                <DemoBadge />
              </div>
              <ul className="mt-5 divide-y divide-border">
                {DEMO_ACTIVITY.map((a) => (
                  <li key={a.id} className="flex items-center justify-between gap-4 py-3.5">
                    <p className="text-sm text-ink">{a.text}</p>
                    <span className="shrink-0 font-mono text-xs text-muted">
                      {formatRelativeTime(a.timestamp)}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="flex flex-col justify-between bg-charcoal text-white">
              <div>
                <ScanLine className="h-6 w-6 text-pine-light" strokeWidth={1.7} />
                <h2 className="mt-4 font-display text-lg font-semibold">Have something to recover?</h2>
                <p className="mt-2 text-sm text-white/60">
                  Scan an item to get an instant recovery recommendation and value estimate.
                </p>
              </div>
              <Button href="/scan" className="mt-6 bg-white text-charcoal hover:bg-white/90">
                Scan waste
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
      <MobileTabBar />
    </div>
  );
}
